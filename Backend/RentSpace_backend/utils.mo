import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Bool "mo:base/Bool";
import Time "mo:base/Time";

import uuid "mo:uuid/UUID";
import DateTime "mo:datetime/DateTime";
import Map "mo:stablehashmap/FunctionalStableHashMap";
import Source "mo:uuid/async/SourceV4";

import Types "types";

module {
    public func getUuid() : async Text {
        let g = Source.Source();
        uuid.toText(await g.new());
    };
    public func createHotelSK(userIdentity : Text) : async Text {
        let uuid = await getUuid();
        return userIdentity # "#" # uuid;
    };
    public  func getDate():  Text{
        let timeNow : DateTime.DateTime = DateTime.DateTime(Time.now());
        let date=DateTime.toText(timeNow);
    }
};
