import Char "mo:base/Char";
import Hash "mo:base/Hash";
import Bool "mo:base/Bool";
import Time "mo:base/Time";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import uuid "mo:uuid/UUID";
import DateTime "mo:datetime/DateTime";
import Source "mo:uuid/async/SourceV4";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Principal "mo:base/Principal";

module {
    public func getOwnerFromArray<K>(caller : Principal, admin : [Text]) : Bool {
        switch (Array.find<Text>(admin, func(x) : Bool {x == Principal.toText(caller)})) {
            case (null) {false};
            case (?r) {
                true;
            };
        };
    };

    public func paginate<K, V>(array : [(K, V)], chunkSize : Nat) : [[(K, V)]] {

        var paginationArray : List.List<[(K, V)]> = List.nil<[(K, V)]>();
        var num_chunk : Nat = (array.size() + chunkSize -1) / chunkSize;
        for (i in Iter.range(0, num_chunk -1)) {
            var tempArray = List.nil<(K, V)>();
            for (j in Iter.range(0, chunkSize -1)) {
                var index = i * chunkSize + j;
                if (index < array.size()) {
                    tempArray := List.push(array[index], tempArray);
                };
            };
            paginationArray := List.push(List.toArray(tempArray), paginationArray);
        };
        List.toArray(paginationArray);
    };

    public func validText(text : Text, value : Nat) : Bool {
        if (Text.size(text) >= value or Text.size(text) == 0) {
            return false;
        };
        true;
    };
    public func checkKeyExist<K, V>(key : K, map : HashMap.HashMap<K, V>) : Bool {
        switch (map.get(key)) {
            case (null) {false};
            case (?value) {true};
        };
    };
    public func getUuid() : async Text {
        let g = Source.Source();
        uuid.toText(await g.new());
    };
    public func createHotelSK(userIdentity : Text) : async Text {
        let uuid = await getUuid();
        return userIdentity # "#" # uuid;
    };
    public func getDate() : Text {
        let timeNow : DateTime.DateTime = DateTime.DateTime(Time.now());
        let date = DateTime.toText(timeNow);
    };
    public func checkEmail(email : Text) : Bool {

        let letter : Text.Pattern = #char '@';
        let text : Text.Pattern = #text ".";

        Text.contains(email, letter) and Text.contains(email, text);

    };
    public func checkDate(date : Text) : Bool {
        assert (Text.size(date) <= 10);
        let iterdate = Text.toIter(date);
        var i = 0;
        var day = "";
        var month = "";
        var year = "";
        for (c in iterdate) {
            // if (i != 10) {
            //     return false;
            // };
            if (i < 2) {
                day := day # Text.fromChar(c);
            };
            if (i >= 3 and i < 5) {
                month := month # Text.fromChar(c);
            };
            if (i >= 6 and i <= 10) {
                year := year # Text.fromChar(c);
            };
            if (Text.fromChar(c) != "/" and (i == 2 or i == 5)) {
                return false;
            };
            i += 1;
        };
        // return day # "/" # month # "/" #year;
        Text.less(day, "32") and Text.less(month, "13") and Text.greater(year, "1900");

    };
};
