import RBT "mo:base/RBTree";
import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

import Types "Types";
import Utils "../utils";

import uuid "mo:uuid/UUID";
import DateTime "mo:datetime/DateTime";
import Source "mo:uuid/async/SourceV4";

shared ({caller = owner}) actor class () {

    private var hotelDataMap = HashMap.HashMap<Types.HotelId, Types.HotelInfo>(0, Text.equal, Text.hash);
    private var hotelIdMap = HashMap.HashMap<Types.UserId, List.List<Types.HotelId>>(0, Text.equal, Text.hash);
    private var hotelRegisterFrequencyMap = HashMap.HashMap<Types.Year, Types.AnnualData>(0, Text.equal, Text.hash);
    stable var admin : [Types.AdminId] = [];

    func createHotelValidation(hotelData : Types.HotelInfo) {
        if (Utils.validText(hotelData.hotelTitle, 40) == false or Utils.validText(hotelData.hotelDes, 300) == false or Utils.validText(hotelData.hotelLocation, 30) == false or Utils.validText(hotelData.hotelPrice, 15) == false) {
            Debug.trap("Text overLoad");
        };
    };

    public shared ({caller}) func createHotel(hotelData : Types.HotelInfo) : async Types.HotelId {
        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelId, Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == true) {
            Debug.trap("No Access");
        };
        createHotelValidation(hotelData);

        let userIdentity = Principal.toText(caller);
        Utils.updateAnnualStatus(hotelRegisterFrequencyMap);

        let uuid = await Utils.getUuid();
        let hotelId : Types.HotelId = userIdentity # "#" # uuid;
        ignore Utils.putIdInList<Types.UserId, Types.HotelId>(Principal.toText(caller), hotelId, hotelIdMap);
        let getTime = Utils.getDate();
        let hotelInfo : Types.HotelInfo = {
            hotelTitle = hotelData.hotelTitle;
            hotelDes = hotelData.hotelDes;
            hotelImage = hotelData.hotelImage;
            hotelPrice = hotelData.hotelPrice;
            hotelLocation = hotelData.hotelLocation;
            createdAt = getTime;
        };
        hotelDataMap.put(hotelId, hotelInfo);
        hotelId;
    };
    public shared query ({caller = user}) func getHotel(hotelId : Types.HotelId) : async ?Types.HotelInfo {
        hotelDataMap.get(hotelId);
    };
    public shared query ({caller}) func getHotelFrequencyByYear(year : Text) : async ?Types.AnnualData {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("No Access");
        };
        hotelRegisterFrequencyMap.get(year);
    };

    public shared query ({caller}) func getHotelId() : async [Types.HotelId] {
        switch (hotelIdMap.get(Principal.toText(caller))) {
            case (null) {[]};
            case (?value) {List.toArray(value)};
        };
    };
    public shared ({caller}) func updateHotel(hotelId : Types.HotelId, hotelData : Types.HotelInfo) : async ?Types.HotelInfo {

        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelId, Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == false) {
            Debug.trap("No Access");
        };
        createHotelValidation(hotelData);
        let getTime = Utils.getDate();

        let hotelInfo : Types.HotelInfo = {
            hotelTitle = hotelData.hotelTitle;
            hotelDes = hotelData.hotelDes;
            hotelImage = hotelData.hotelImage;
            hotelPrice = hotelData.hotelPrice;

            hotelLocation = hotelData.hotelLocation;
            createdAt = getTime;
        };
        hotelDataMap.replace(hotelId, hotelInfo);
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };

    public shared ({caller}) func deleteHotel(hotelId : Types.HotelId) : async Text {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("No Access");
        };
        hotelDataMap.delete(hotelId);
        "Suceessfully Deleted the hotel";
    };

    public shared query ({caller}) func scanHotel(pageNo : Nat, chunkSize : Nat) : async [(Types.HotelId, Types.HotelInfo)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("No Access");
        };
        let allData = Utils.paginate<Types.HotelId, Types.HotelInfo>(Iter.toArray(hotelDataMap.entries()), chunkSize);
        allData[pageNo];
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
};
