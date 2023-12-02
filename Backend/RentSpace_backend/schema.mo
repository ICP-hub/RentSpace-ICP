import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Int64 "mo:base/Int64";
import Nat64 "mo:base/Nat64";
import Prelude "mo:base/Prelude";

shared ({ caller = owner }) actor class Schema({
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
    public query func getPK() : async Text { db.pk };

    //@required public API(Do not Delete or Change)
    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    //@required public API (Do not delete or change)
    public shared ({ caller = caller }) func transferCycles() : async () {
        if (caller == owner) {
            return await CA.transferCycles(caller);
        };
    };

    ///--------------------------------------------------------------------///
    ///------schema for listing the rent spaces start from here------------///
    ///--------------------------------------------------------------------///
    // Create a new user. In this basic case, we're using the user's name as the sort key
    // This works for our hello world app, but as names are easily duplicated, one might want
    // to attach an unique identifier to the sk to separate users with the same name

    public func createAccount(userIdentity : Text, firstName : Text, lastName : Text, dob : Text, userEmail : Text, userType : Text) : async () {
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

    type AccountInfo = {
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
    func unWarpAccountInfo(entity : Entity.Entity) : ?AccountInfo {
        let { sk; attributes } = entity;
        let firstNameValue = Entity.getAttributeMapValueForKey(attributes, "firstName");
        let lastNameValue = Entity.getAttributeMapValueForKey(attributes, "lastName");
        let dobValue = Entity.getAttributeMapValueForKey(attributes, "dob");
        let userEmailValue = Entity.getAttributeMapValueForKey(attributes, "userEmail");
        let userTypeValue = Entity.getAttributeMapValueForKey(attributes, "userType");
        let userProfileValue = Entity.getAttributeMapValueForKey(attributes, "userProfile");
        let userGovIdValue = Entity.getAttributeMapValueForKey(attributes, "userGovId");
        let hostStatusValue = Entity.getAttributeMapValueForKey(attributes, "hostStatus");
        let verificationStatusValue = Entity.getAttributeMapValueForKey(attributes, "verificationStatus");

        switch (firstNameValue, lastNameValue, dobValue, userEmailValue, userTypeValue, userProfileValue, userGovIdValue, hostStatusValue, verificationStatusValue) {
            case (
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
    ///----function to get the getAccountInfo data using the by passing uuid as sortkey------///

    public query func getAccountInfo(user : Text) : async ?AccountInfo {
        let userIdentity = user;
        let accountInfo = switch (CanDB.get(db, { sk = userIdentity })) {
            case null { null };
            case (?accountEntity) { unWarpAccountInfo(accountEntity) };
        };
        switch (accountInfo) {
            case null { null };
            case (?u) {
                ?u;
            };
        };
    };
    //public function to update the data of the canister
    public func updateAccountInfo(user : Text, accountData : AccountInfo) : async ?AccountInfo {
        let userIdentity = user;
        let accountInfo = await* CanDB.replace(
            db,
            {
                sk = userIdentity;
                attributes = [
                    ("firstName", #text(accountData.firstName)),
                    ("lastName", #text(accountData.lastName)),
                    ("dob", #text(accountData.dob)),
                    ("userEmail", #text(accountData.userEmail)),
                    ("userType", #text(accountData.userType)),
                    ("userProfile", #text(accountData.userProfile)),
                    ("userGovId", #text(accountData.userGovId)),
                    ("hostStatus", #bool(accountData.hostStatus)),
                    ("verificationStatus", #bool(accountData.verificationStatus)),
                ];
            },
        );
        switch (accountInfo) {
            case (null) { null };
            case (?u) { unWarpAccountInfo(u) };
        };
    };

    ///----------Pagination of the Account info------------///
    public query func scanAccounts(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async ScanAccount {
        //cap the amount of entries one can return from database to reduce load and incentive use pagiation
        let cappedLimit = if (limit > 10) { 10 } else { limit };
        let { entities; nextKey } = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = cappedLimit;
                ascending = ascending;
            },
        );
        {
            accounts = arrayUnwarpAccount(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpAccount(entities : [Entity.Entity]) : [AccountInfo] {
        Array.mapFilter<Entity.Entity, AccountInfo>(
            entities,
            func(e) {
                let { sk; attributes } = e;
                let firstNameValue = Entity.getAttributeMapValueForKey(attributes, "firstName");
                let lastNameValue = Entity.getAttributeMapValueForKey(attributes, "lastName");
                let dobValue = Entity.getAttributeMapValueForKey(attributes, "dob");
                let userEmailValue = Entity.getAttributeMapValueForKey(attributes, "userEmail");
                let userTypeValue = Entity.getAttributeMapValueForKey(attributes, "userType");
                let userProfileValue = Entity.getAttributeMapValueForKey(attributes, "userProfile");
                let userGovIdValue = Entity.getAttributeMapValueForKey(attributes, "userGovId");
                let hostStatusValue = Entity.getAttributeMapValueForKey(attributes, "hostStatus");
                let verificationStatusValue = Entity.getAttributeMapValueForKey(attributes, "verificationStatus");

                switch (firstNameValue, lastNameValue, dobValue, userEmailValue, userTypeValue, userProfileValue, userGovIdValue, hostStatusValue, verificationStatusValue) {
                    case (
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
    //----------------------------------------------------------------------///
    //-------schema for listing the rent spaces start from here-------------///
    ///---------------------------------------------------------------------///

    type RentSpaceInfo = {
        spaceTitle : Text;
        spaceDes : Text;
        spaceImage : Text;
        spacePrice : Text;
        spaceLocation : Text;
    };
    ///---------public function to create the new rentspaces---------///
    public func createRentSpace(uuid : Text, spaceData : RentSpaceInfo) : async () {
        let sortKey = uuid;
        let spaceExist = await skExists(sortKey);
        if (uuid == "" or spaceData.spaceTitle == "" or spaceData.spaceDes == "" or spaceData.spaceImage == "" or spaceData.spacePrice == "" or spaceData.spaceLocation == "") {
            return ();
        };
        await* CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("spaceTitle", #text(spaceData.spaceTitle)),
                    ("spaceDes", #text(spaceData.spaceDes)),
                    ("spaceImage", #text(spaceData.spaceImage)),
                    ("spacePrice", #text(spaceData.spacePrice)),
                    ("spaceLocation", #text(spaceData.spaceLocation)),
                ];
            },
        );
    };
    ///----function to get the rentspace data using the by passing uuid as sortkey------///
    public query func getRentSpace(uuid : Text) : async ?RentSpaceInfo {
        let sortKey = uuid;
        let spaceData = switch (CanDB.get(db, { sk = sortKey })) {
            case (null) { null };
            case (?data) { unwrapRentSpace(data) };
        };
        switch (spaceData) {
            case (null) { null };
            case (?u) { ?u };
        };
    };

    type ScanAccount = {
        accounts : [AccountInfo];
        nextKey : ?Text;
    };

    func unwrapRentSpace(entity : Entity.Entity) : ?RentSpaceInfo {
        let { sk; attributes } = entity;
        let spaceTitleValue = Entity.getAttributeMapValueForKey(attributes, "spaceTitle");
        let spaceDesValue = Entity.getAttributeMapValueForKey(attributes, "spaceDes");
        let spaceImageValue = Entity.getAttributeMapValueForKey(attributes, "spaceImage");
        let spacePriceValue = Entity.getAttributeMapValueForKey(attributes, "spacePrice");
        let spaceLocationValue = Entity.getAttributeMapValueForKey(attributes, "spaceLocation");

        switch (spaceTitleValue, spaceDesValue, spaceImageValue, spacePriceValue, spaceLocationValue) {
            case (
                ?(#text(spaceTitle)),
                ?(#text(spaceDes)),
                ?(#text(spaceImage)),
                ?(#text(spacePrice)),
                ?(#text(spaceLocation)),
            ) {
                ?{
                    spaceTitle;
                    spaceDes;
                    spaceImage;
                    spacePrice;
                    spaceLocation;
                };
            };
            case _ { null };
        };
    };

    ////--function to update the rentspace data---////
    public func updateRentSpace(uuid : Text, spaceData : RentSpaceInfo) : async ?RentSpaceInfo {
        let sortKey = uuid;
        let newData = await* CanDB.replace(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("spaceTitle", #text(spaceData.spaceTitle)),
                    ("spaceDes", #text(spaceData.spaceDes)),
                    ("spaceImage", #text(spaceData.spaceImage)),
                    ("spacePrice", #text(spaceData.spacePrice)),
                    ("spaceLocation", #text(spaceData.spaceLocation)),
                ];
            },
        );
        switch (newData) {
            case (?u) { unwrapRentSpace(u) };
            case (null) { null };
        };
    };

    type ScanRentSpaces = {
        rentSpaces : [RentSpaceInfo];
        nextKey : ?Text;
    };
    ///---pagiantion of rentSpaces----///
    public query func scanRent(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async ScanRentSpaces {
        //cap the amount of entries one can return from database to reduce load and incentive use pagiation
        let cappedLimit = if (limit > 10) { 10 } else { limit };
        let { entities; nextKey } = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = cappedLimit;
                ascending = ascending;
            },
        );
        {
            rentSpaces = arrayUnwarpSpaces(entities);
            nextKey = nextKey;
        };
    };

    func arrayUnwarpSpaces(entities : [Entity.Entity]) : [RentSpaceInfo] {
        Array.mapFilter<Entity.Entity, RentSpaceInfo>(
            entities,
            func(e) {
                let { sk; attributes } = e;
                Debug.print(debug_show (e));
                let spaceTitleValue = Entity.getAttributeMapValueForKey(attributes, "spaceTitle");
                let spaceDesValue = Entity.getAttributeMapValueForKey(attributes, "spaceDes");
                let spaceImageValue = Entity.getAttributeMapValueForKey(attributes, "spaceImage");
                let spacePriceValue = Entity.getAttributeMapValueForKey(attributes, "spacePrice");
                let spaceLocationValue = Entity.getAttributeMapValueForKey(attributes, "spaceLocation");

                switch (spaceTitleValue, spaceDesValue, spaceImageValue, spacePriceValue, spaceLocationValue) {
                    case (
                        ?(#text(spaceTitle)),
                        ?(#text(spaceDes)),
                        ?(#text(spaceImage)),
                        ?(#text(spacePrice)),
                        ?(#text(spaceLocation)),
                    ) {
                        ?{
                            spaceTitle = spaceTitle;
                            spaceDes = spaceDes;
                            spaceImage = spaceImage;
                            spacePrice = spacePrice;
                            spaceLocation = spaceLocation;
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
    ///-----------------------------Ends Here----------------------------///

};
