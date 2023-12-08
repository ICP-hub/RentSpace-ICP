import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import RBT "mo:stable-rbtree/StableRBTree";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int64 "mo:base/Int64";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Prelude "mo:base/Prelude";
import List "mo:base/List";
import utils "./utils";

// let g = Source.Source();
// UUID.toText(await g.new());

shared ({caller = owner}) actor class Booking({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) {

    stable var bookingIdTree = RBT.init<Text, List.List<Text>>();

    /// @required (may wrap, but must be present in some form in the canister)
    stable let db = CanDB.init({
        pk = partitonKey;
        scalingOptions = scalingOptions;
        btreeOrder = null;
    });

    // @recommended (not required) public API
    public query func getPK() : async Text {db.pk};

    //@required public API(Do not Delete or Change)
    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    //@required public API (Do not delete or change)
    public shared ({caller = caller}) func transferCycles() : async () {
        if (caller == owner) {
            return await CA.transferCycles(caller);
        };
    };
    func createBookingId(hotelId : Text, date : Text) : async Text {
        let uuid = await utils.getUuid();
        let bookingId = hotelId # "#" #date # "#" #uuid;
    };

    
    func putUserId(userIdentity : Text, bookingId:Text) : async () {

        switch (RBT.get(bookingIdTree, Text.compare, userIdentity)) {
            case (?result) {
                Debug.print(debug_show (result));
                let data = List.push(bookingId, result);
                bookingIdTree := RBT.put(bookingIdTree, Text.compare, userIdentity, data);
                return 
            };
            case null {
                var bookingIdList = List.nil<Text>();
                Debug.print("inside Null");
                bookingIdList := List.push(bookingId, bookingIdList);
                bookingIdTree := RBT.put(bookingIdTree, Text.compare, userIdentity, bookingIdList);
                return 
            };
        };
    };
    type BookingInfo = {
        userId : Text;
        bookingDuration : Text;
        cancelStatus : Bool;
    };
    public func bookHotel(hotelId : Text, date : Text, userId : Text, bookingDuration : Text, cancelStatus : Bool) : async () {
        let sortKey = await createBookingId(hotelId, date);
        if (hotelId == "" or date == "" or sortKey == "") {
            return;
        };
        await* CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("userId", #text(userId)),
                    ("bookingDuration", #text(bookingDuration)),
                    ("cacelStatus", #bool(cancelStatus)),
                ];
            },
        );
    };
    // func unwarpBookingDetails(entity : Entity.Entity) : ?public func getBookingDetials(bookingId : Text) : async Text {

    // };

};
