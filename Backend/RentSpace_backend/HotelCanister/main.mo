import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Trie "mo:base/Trie";
import Types "Types";
import Utils "../utils";

shared ({caller = owner}) actor class () {
    // stable let userCanisterId = "wenzb-uyaaa-aaaan-qlwsa-cai";
     let userCanisterId = "be2us-64aaa-aaaaa-qaabq-cai";
    stable var hotelDataMap = Trie.empty<Types.HotelId, Types.HotelInfo>();
    stable var hotelIdMap = Trie.empty<Types.UserId, List.List<Types.HotelId>>();
    stable var hotelRegisterFrequencyMap = Trie.empty<Types.Year, Types.AnnualData>();
    stable var admin : [Types.AdminId] = [];

    let userActor = actor (userCanisterId) : actor {
        checkUserExist : query (Text) -> async Bool;
    };

    func createHotelValidation(hotelData : Types.HotelInfo) {
        if (Utils.validText(hotelData.hotelTitle, 40) == false or Utils.validText(hotelData.hotelDes, 300) == false or Utils.validText(hotelData.hotelLocation, 30) == false or Utils.validText(hotelData.hotelPrice, 15) == false) {
            Debug.trap("Text overLoad");
        };
    };

    public shared ({caller}) func createHotel(hotelData : Types.HotelInfo) : async Types.HotelId {
        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == true) {
            Debug.trap("No Access");
        };
        createHotelValidation(hotelData);

        let userIdentity = Principal.toText(caller);
        let userExistStaus = await userActor.checkUserExist(userIdentity);
        if (userExistStaus == false) {
            Debug.trap("No User Exist!");
        };
        hotelRegisterFrequencyMap := Utils.updateAnnualStatus(hotelRegisterFrequencyMap);

        let uuid = await Utils.getUuid();
        let hotelId : Types.HotelId = userIdentity # "#" # uuid;
        let {updatedTrie} = Utils.putIdInList<Types.HotelId>(Principal.toText(caller), hotelId, hotelIdMap);
        hotelIdMap := updatedTrie;
        let getTime = Utils.getDate();
        let hotelInfo : Types.HotelInfo = {
            hotelTitle = hotelData.hotelTitle;
            hotelDes = hotelData.hotelDes;
            hotelImage = hotelData.hotelImage;
            hotelPrice = hotelData.hotelPrice;
            hotelLocation = hotelData.hotelLocation;
            hotelAvailableFrom = hotelData.hotelAvailableFrom;
            hotelAvailableTill = hotelData.hotelAvailableTill;
            createdAt = getTime;
            updatedAt = null;
        };
        hotelDataMap := Trie.put(hotelDataMap, Utils.textKey hotelId, Text.equal, hotelInfo).0;
        hotelId;
    };

    public query func getHotel(hotelId : Types.HotelId) : async ?Types.HotelInfo {
        // hotelDataMap.get(hotelId);
        Trie.get(hotelDataMap, Utils.textKey hotelId, Text.equal);
    };
    public shared query ({caller}) func getHotelFrequencyByYear(year : Text) : async ?Types.AnnualData {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("No Access");
        };
        // hotelRegisterFrequencyMap.get(year);
        Trie.get(hotelRegisterFrequencyMap, Utils.textKey year, Text.equal);
    };

    public shared query ({caller}) func getHotelId() : async [Types.HotelId] {
        let userIdentity = Principal.toText(caller);
        switch (Trie.get(hotelIdMap, Utils.textKey userIdentity, Text.equal)) {
            case (null) {[]};
            case (?value) {List.toArray(value)};
        };
    };
    public shared ({caller}) func updateHotel(hotelId : Types.HotelId, hotelData : Types.HotelInfo) : async ?Types.HotelInfo {

        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == false) {
            Debug.trap("No Access");
        };
        createHotelValidation(hotelData);
        let getTime = Utils.getDate();

        let hotelInfo : Types.HotelInfo = {
            hotelTitle = hotelData.hotelTitle;
            hotelDes = hotelData.hotelDes;
            hotelImage = hotelData.hotelImage;
            hotelPrice = hotelData.hotelPrice;
            hotelAvailableFrom = hotelData.hotelAvailableFrom;
            hotelAvailableTill = hotelData.hotelAvailableTill;
            hotelLocation = hotelData.hotelLocation;
            createdAt = hotelData.createdAt;
            updatedAt = ?getTime;
        };
        hotelDataMap := Trie.put(hotelDataMap, Utils.textKey hotelId, Text.equal, hotelInfo).0;
        ?hotelInfo;
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };

    public shared ({caller}) func deleteHotel(hotelId : Types.HotelId) : async Text {
        // if (Utils.getOwnerFromArray(caller, admin) == false) {
        //     Debug.trap("No Access");
        // };
        // hotelDataMap.delete(hotelId);
        hotelDataMap := Trie.remove(hotelDataMap, Utils.textKey hotelId, Text.equal).0;
        "Suceessfully Deleted the hotel";
    };
    public shared query func getNoOfPages(chunkSize : Nat) : async Nat {
        let data : [(Types.HotelId, Types.HotelInfo)] = Trie.toArray<Types.HotelId, Types.HotelInfo, (Types.HotelId, Types.HotelInfo)>(hotelDataMap, func(k, v) = (k, v));
        let allData = Utils.paginate<Types.HotelId, Types.HotelInfo>(data, chunkSize);
        allData.size();
    };
    public shared query ({caller}) func scanHotel(pageNo : Nat, chunkSize : Nat) : async [(Types.HotelId, Types.HotelInfo)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("No Access");
        };
        let data : [(Types.HotelId, Types.HotelInfo)] = Trie.toArray<Types.HotelId, Types.HotelInfo, (Types.HotelId, Types.HotelInfo)>(hotelDataMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Types.HotelId, Types.HotelInfo>(data, chunkSize);
        if (allData.size() <= pageNo) {
            Debug.trap("No page Exist");
        };
        allData[pageNo];
    };

    public query func checkHotelExist(hotelId : Text) : async Bool {
        // Checking if the user exists in the user data map
        Utils.checkKeyExist<Types.HotelInfo>(hotelId, hotelDataMap);
    };
    public query func getHotelAvailabilty(hotelId : Types.HotelId) : async ?{
        hotelAvailableFrom : Text;
        hotelAvailableTill : Text;
    } {
        let hotelInfo = Trie.get(hotelDataMap, Utils.textKey hotelId, Text.equal);
        switch (hotelInfo) {
            case (?value) {
                return ?{
                    hotelAvailableFrom = value.hotelAvailableFrom;
                    hotelAvailableTill = value.hotelAvailableTill;
                };
            };
            case (null) {null};
        };

    };

    public shared ({caller}) func addOwner(ownerIds : Text) : async Text {
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
    public shared query ({caller}) func getAllAdmin() : async [Types.AdminId] {
        if (caller != owner) {
            return ["No Access"];
        };
        return admin;
    };
    public query func getTime() : async Int {
        let getTime = Time.now();
        return getTime;
    };
};
