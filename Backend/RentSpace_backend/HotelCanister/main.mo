import RBT "mo:base/RBTree";
import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";

import uuid "mo:uuid/UUID";
import DateTime "mo:datetime/DateTime";
import Source "mo:uuid/async/SourceV4";

import User "canister:User";
import Types "Types";
import Utils "../utils";

shared ({caller = owner}) actor class () {

    var hotelDataMap = HashMap.HashMap<Types.HotelId, Types.HotelInfo>(0, Text.equal, Text.hash);
    var hotelIdMap = HashMap.HashMap<Types.HotelId, List.List<Text>>(0, Text.equal, Text.hash);

    func createHotelValidation(hotelData : Types.HotelInfo) {
        if (Utils.validText(hotelData.hotelTitle, 40) == false or Utils.validText(hotelData.hotelDes, 300) == false or Utils.validText(hotelData.hotelLocation, 30) == false or Utils.validText(hotelData.hotelPrice, 15) == false) {
            Debug.trap("Text overLoad");
        };
    };

    public shared ({caller}) func createHotel(hotelData : Types.HotelInfo) : async () {
        let userStatus = await User.checkUserExist();
        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelId, Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == false or userStatus == false) {
            Debug.trap("No Access");
        };
        createHotelValidation(hotelData);

        let userIdentity = Principal.toText(caller);

        let uuid = await Utils.getUuid();
        let hotelId : Types.HotelId = userIdentity # "#" # uuid;
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
    };
    public shared query ({caller = user}) func getHotel(hotelId : Types.HotelId) : async ?Types.HotelInfo {
        hotelDataMap.get(hotelId);
    };
    public shared ({caller}) func updateHotel(hotelId : Types.HotelId, hotelData : Types.HotelInfo) : async ?Types.HotelInfo {
        let userStatus = await User.checkUserExist();

        if (Principal.isAnonymous(caller) == true or Utils.checkKeyExist<Types.HotelId, Types.HotelInfo>(Principal.toText(caller), hotelDataMap) == false or userStatus == false) {
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

};
