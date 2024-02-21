import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Util "mo:xtended-numbers/Util";

import Types "Types";
import Utils "../utils";

shared ({caller = owner}) actor class () = this {

    private stable var bookingData : [(Types.BookingId, Types.BookingInfo)] = [];
    private stable var userXBookingId : [(Types.UserId, List.List<Types.BookingId>)] = [];
    private stable var hotelXBookingId : [(Types.HotelId, List.List<Types.BookingId>)] = [];

    private var bookingDataMap = HashMap.HashMap<Types.BookingId, Types.BookingInfo>(0, Text.equal, Text.hash);
    private var userXBookingIdMap = HashMap.HashMap<Types.UserId, List.List<Types.BookingId>>(0, Text.equal, Text.hash);
    private var hotelXBookingIdMap = HashMap.HashMap<Types.HotelId, List.List<Types.BookingId>>(0, Text.equal, Text.hash);

    stable var admin : [Types.AdminId] = [];

    func validate(bookingData : Types.BookingInfo) {
        if (Utils.validText(bookingData.userId, 70) == false or Utils.validText(bookingData.date, 20) == false or Utils.validText(bookingData.bookingDuration, 20) == false or Utils.validText(bookingData.paymentId, 20) == false) {
            Debug.trap("Error! Text overflow");
        };
    };
    func putBookingIdInList<K, V>(key : K, value : V, treeMap : HashMap.HashMap<K, List.List<V>>) : V {

        switch (treeMap.get(key)) {
            case (?result) {
                let data = List.push<V>(value, result);
                treeMap.put(key, data);
                return value;
            };
            case null {
                var bookingIdList = List.nil<V>();
                bookingIdList := List.push(value, bookingIdList);
                treeMap.put(key, bookingIdList);
                return value;
            };
        };
    };
    func createBookingId(userIdentity : Text, hotelId : Text) : async Text {
        let uuid = await Utils.getUuid();
        let date = Utils.getDate();
        let bookingId = hotelId # "#" # date # "#" #uuid;
        ignore putBookingIdInList<Types.UserId, Types.BookingId>(userIdentity, bookingId, userXBookingIdMap);
        putBookingIdInList<Types.HotelId, Types.BookingId>(hotelId, bookingId, hotelXBookingIdMap);
    };

    public shared ({caller = user}) func bookHotel(hotelId : Types.HotelId, bookingInfo : Types.BookingInfo) : async () {
        let userIdentity = Principal.toText(user);
        if (Principal.isAnonymous(user) == true) {
            Debug.trap("Error! You are already a user");

        };
        validate(bookingInfo);
        let bookingDate = Utils.getDate();
        let bookingId = await createBookingId(userIdentity, hotelId);
        let bookingData : Types.BookingInfo = {
            userId = userIdentity;
            date = bookingDate;
            bookingDuration = bookingInfo.bookingDuration;
            cancelStatus = false;
            refundStatus = false;
            paymentStatus = false;
            paymentId = bookingInfo.paymentId;
        };
        bookingDataMap.put(bookingId, bookingData);
    };
    public shared query ({caller = user}) func getBookingId() : async [Text] {
        assert (Principal.isAnonymous(user) == false);
        switch (userXBookingIdMap.get(Principal.toText(user))) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };
    public shared query ({caller = user}) func gethotelXBookingId(hotelId : Text) : async [Text] {
        assert (Principal.isAnonymous(user) == false);
        switch (hotelXBookingIdMap.get(hotelId)) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };
    public shared query ({caller = user}) func getBookingDetials(bookingId : Text) : async ?Types.BookingInfo {
        let id = bookingId;
        let bookingData = switch (bookingDataMap.get(bookingId)) {
            case (null) {null};
            case (?data) {?data};
        };
    };

    public shared ({caller = user}) func updateBookingStatus(bookingId : Text, bookingInfo : Types.BookingInfo) : async () {
        if (Principal.isAnonymous(user) == true or Utils.checkKeyExist(bookingId, bookingDataMap) == false) {
            Debug.trap("No Access");
        };
        validate(bookingInfo);
        let bookingData : Types.BookingInfo = {
            userId = bookingInfo.userId;
            date = bookingInfo.date;
            bookingDuration = bookingInfo.bookingDuration;
            cancelStatus = bookingInfo.cancelStatus;
            refundStatus = bookingInfo.refundStatus;
            paymentStatus = bookingInfo.paymentStatus;
            paymentId = bookingInfo.paymentId;
        };
        bookingDataMap.put(bookingId, bookingData);
    };
    public shared query ({caller}) func scanBooking(pageNo : Nat, chunkSize : Nat) : async [(Types.BookingId, Types.BookingInfo)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let allData = Utils.paginate<Types.BookingId, Types.BookingInfo>(Iter.toArray(bookingDataMap.entries()), chunkSize);
        allData[pageNo];
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };

    public shared ({caller}) func addOwner(ownerIds : Types.AdminId) : async Text {
        if (caller == owner) {
            let list = List.push(ownerIds, List.fromArray(admin));
            admin := List.toArray(list);
            "Successfully inserted data";
        } else if (Utils.getOwnerFromArray(caller, admin) == true) {
            let list = List.push(ownerIds, List.fromArray(admin));
            admin := List.toArray(list);
            "Successfully inserted data";
        } else {
            Debug.trap("No Access to Add Owner");
        };
    };
    system func preupgrade() {
        bookingData := Iter.toArray(bookingDataMap.entries());
        userXBookingId := Iter.toArray(userXBookingIdMap.entries());
        hotelXBookingId := Iter.toArray(hotelXBookingIdMap.entries());
    };

    system func postupgrade() {
        bookingDataMap := HashMap.fromIter<Types.BookingId, Types.BookingInfo>(bookingData.vals(), bookingData.size(), Text.equal, Text.hash);
        userXBookingIdMap := HashMap.fromIter<Types.UserId, List.List<Types.BookingId>>(userXBookingId.vals(), userXBookingId.size(), Text.equal, Text.hash);
        hotelXBookingIdMap := HashMap.fromIter<Types.HotelId, List.List<Types.BookingId>>(hotelXBookingId.vals(), hotelXBookingId.size(), Text.equal, Text.hash);

    };
};
