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


// let g = Source.Source();
// UUID.toText(await g.new());

shared ({caller = owner}) actor class Users({
    //partiton key of this canister
    partitonKey : Text;
    //the scaling options that determine when to auto-scale out this canister storage
    scalingOptions : CanDB.ScalingOptions;
    // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
    owners : ?[Principal];
}) {


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

//     public func getUuid():async Text{
//     let g = Source.Source();
//     UUID.toText(await g.new());
//   };
    ///--------------------------------------------------------------------///
    ///------schema for listing the rent spaces start from here------------///
    ///--------------------------------------------------------------------///
    // Create a new user. In this basic case, we're using the user's name as the sort key
    // This works for our hello world app, but as names are easily duplicated, one might want
    // to attach an unique identifier to the sk to separate users with the same name

    public shared({caller=user1})func createUser(user : Text, firstName : Text, lastName : Text, dob : Text, userEmail : Text, userType : Text) : async () {
        let userIdentity = user;
        let identityStatus = await skExists(userIdentity);
        if (userIdentity == "" or userType == "" or firstName == "" or lastName == "" or dob == "" or userEmail == "" or identityStatus == true) {
            return;
        };
        //inserts the entity into CanDB
        await* CanDB.put(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("userId", #text(userIdentity)),
                    ("firstName", #text(firstName)),
                    ("lastName", #text(lastName)),
                    ("dob", #text(dob)),
                    ("userEmail", #text(userEmail)),
                    ("userType", #text("guest")),
                    ("userProfile", #text("")),
                    ("userGovId", #text("")),
                    ("hostStatus", #bool(false)),
                    ("verificationStatus", #bool(false)),
                ];
            },
        );
    };

    type UserInfo = {
        userId : Text;
        firstName : Text;
        lastName : Text;
        dob : Text;
        userEmail : Text;
        userType : Text;
        userProfile : Text;
        userGovId : Text;
        hostStatus : Bool;
        verificationStatus : Bool;
    };
    // attempts to cast an Entity (retrieved from CanDB) into a User type
    func unWarpUserInfo(entity : Entity.Entity) : ?UserInfo {
        let {sk; attributes} = entity;
        let userIdValue = Entity.getAttributeMapValueForKey(attributes, "userId");
        let firstNameValue = Entity.getAttributeMapValueForKey(attributes, "firstName");
        let lastNameValue = Entity.getAttributeMapValueForKey(attributes, "lastName");
        let dobValue = Entity.getAttributeMapValueForKey(attributes, "dob");
        let userEmailValue = Entity.getAttributeMapValueForKey(attributes, "userEmail");
        let userTypeValue = Entity.getAttributeMapValueForKey(attributes, "userType");
        let userProfileValue = Entity.getAttributeMapValueForKey(attributes, "userProfile");
        let userGovIdValue = Entity.getAttributeMapValueForKey(attributes, "userGovId");
        let hostStatusValue = Entity.getAttributeMapValueForKey(attributes, "hostStatus");
        let verificationStatusValue = Entity.getAttributeMapValueForKey(attributes, "verificationStatus");

        switch (userIdValue, firstNameValue, lastNameValue, dobValue, userEmailValue, userTypeValue, userProfileValue, userGovIdValue, hostStatusValue, verificationStatusValue) {
            case (
                ?(#text(userId)),
                ?(#text(firstName)),
                ?(#text(lastName)),
                ?(#text(dob)),
                ?(#text(userEmail)),
                ?(#text(userType)),
                ?(#text(userProfile)),
                ?(#text(userGovId)),
                ?(#bool(hostStatus)),
                ?(#bool(verificationStatus)),
            ) {
                ?{
                    userId;
                    firstName;
                    lastName;
                    dob;
                    userEmail;
                    userType;
                    userProfile;
                    userGovId;
                    hostStatus;
                    verificationStatus;
                };
            };
            case _ {
                null;
            };
        };
    };
    ///----function to get the getUserInfo data using the by passing uuid as sortkey------///

    public  shared query({caller=user1}) func  getUserInfo(user:Text) : async ?UserInfo {
        let userIdentity = user;
        let userInfo = switch (CanDB.get(db, {sk = userIdentity})) {
            case null {null};
            case (?userEntity) {unWarpUserInfo(userEntity)};
        };
        switch (userInfo) {
            case null {null};
            case (?u) {
                ?u;
            };
        };
    };
    //public function to update the data of the canister
    public func updateUserInfo(user : Text, userData : UserInfo) : async ?UserInfo {
        let userIdentity = user;
        let userInfo = await* CanDB.replace(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("userId", #text(userData.userId)),
                    ("firstName", #text(userData.firstName)),
                    ("lastName", #text(userData.lastName)),
                    ("dob", #text(userData.dob)),
                    ("userEmail", #text(userData.userEmail)),
                    ("userType", #text(userData.userType)),
                    ("userProfile", #text(userData.userProfile)),
                    ("userGovId", #text(userData.userGovId)),
                    ("hostStatus", #bool(userData.hostStatus)),
                    ("verificationStatus", #bool(userData.verificationStatus)),
                ];
            },
        );
        switch (userInfo) {
            case (null) {null};
            case (?u) {unWarpUserInfo(u)};
        };
    };
      type ScanUser = {
        users : [UserInfo];
        nextKey : ?Text;
    };

    ///----------Pagination of the User info------------///
    public query func scanUsers(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async ScanUser {
        //cap the amount of entries one can return from database to reduce load and incentive use pagiation
        let cappedLimit = if (limit > 10) {10} else {limit};
        let {entities; nextKey} = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = cappedLimit;
                ascending = ascending;
            },
        );
        {
            users = arrayUnwarpUser(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpUser(entities : [Entity.Entity]) : [UserInfo] {
        Array.mapFilter<Entity.Entity, UserInfo>(
            entities,
            func(e) {
                let {sk; attributes} = e;
                let userIdValue = Entity.getAttributeMapValueForKey(attributes, "userId");
                let firstNameValue = Entity.getAttributeMapValueForKey(attributes, "firstName");
                let lastNameValue = Entity.getAttributeMapValueForKey(attributes, "lastName");
                let dobValue = Entity.getAttributeMapValueForKey(attributes, "dob");
                let userEmailValue = Entity.getAttributeMapValueForKey(attributes, "userEmail");
                let userTypeValue = Entity.getAttributeMapValueForKey(attributes, "userType");
                let userProfileValue = Entity.getAttributeMapValueForKey(attributes, "userProfile");
                let userGovIdValue = Entity.getAttributeMapValueForKey(attributes, "userGovId");
                let hostStatusValue = Entity.getAttributeMapValueForKey(attributes, "hostStatus");
                let verificationStatusValue = Entity.getAttributeMapValueForKey(attributes, "verificationStatus");

                switch (userIdValue, firstNameValue, lastNameValue, dobValue, userEmailValue, userTypeValue, userProfileValue, userGovIdValue, hostStatusValue, verificationStatusValue) {
                    case (
                        ?(#text(userId)),
                        ?(#text(firstName)),
                        ?(#text(lastName)),
                        ?(#text(dob)),
                        ?(#text(userEmail)),
                        ?(#text(userType)),
                        ?(#text(userProfile)),
                        ?(#text(userGovId)),
                        ?(#bool(hostStatus)),
                        ?(#bool(verificationStatus)),
                    ) {
                        ?{
                            userId;
                            firstName;
                            lastName;
                            dob;
                            userEmail;
                            userType;
                            userProfile;
                            userGovId;
                            hostStatus;
                            verificationStatus;
                        };
                    };
                    case _ {
                        Debug.print("Invalid data");
                        null;
                    };
                };
            },
        );
    };
    ///----------------------------------------------------------------------///
    ///-------schema for listing the rent spaces start from here-------------///
    ///---------------------------------------------------------------------///

    
};
