import Char "mo:base/Char";
import Bool "mo:base/Bool";
import Time "mo:base/Time";
import Text "mo:base/Text";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Principal "mo:base/Principal";
import {now} "mo:base/Time";
import Trie "mo:base/Trie";
import Month "month";

import uuid "mo:uuid/UUID";
import DateTime "mo:datetime/DateTime";
import Source "mo:uuid/async/SourceV4";
import Types "./bookingCanister/Types";

module {
    type Key<K> = Trie.Key<K>;

    public func textKey(t : Text) : Key<Text> {{hash = Text.hash t; key = t}};

    public func updateAnnualStatus(trie : Trie.Trie<Types.Year, Types.AnnualData>) : Trie.Trie<Types.Year, Types.AnnualData> {

        let date = DateTime.DateTime(now()).toText();
        var counter = 0;
        var year = "";
        var month = "";
        for (i in Text.toIter(date)) {
            if (counter <= 3) {
                year := year # Char.toText(i);
            };
            if (counter >= 5 and counter <= 6) {
                month := month # Char.toText(i);
            };
            counter += 1;
        };
        switch (Trie.get(trie, textKey year, Text.equal)) {
            case (null) {
                let intialAnnualData = {
                    jan = 0;
                    feb = 0;
                    march = 0;
                    april = 0;
                    may = 0;
                    june = 0;
                    july = 0;
                    aug = 0;
                    sep = 0;
                    oct = 0;
                    nov = 0;
                    dec = 0;
                };
                let monthData = Month.updateMonthData(month, intialAnnualData);
                return Trie.put(trie, textKey year, Text.equal, monthData).0;
            };
            case (?result) {
                let updatedMonthData = Month.updateMonthData(month, result);
                return Trie.put(trie, textKey year, Text.equal, updatedMonthData).0;

            };
        };
    };
    public func putIdInList<V>(key : Text, value : V, treeMap : Trie.Trie<Text, List.List<V>>) : {
        value : V;
        updatedTrie : Trie.Trie<Text, List.List<V>>;
    } {

        switch (Trie.get(treeMap, textKey key, Text.equal)) {
            case (?result) {
                let data = List.push<V>(value, result);
                // treeMap.put(key, data);
                let updatedTrie = Trie.put(treeMap, textKey key, Text.equal, data).0;
                return {value; updatedTrie};

            };
            case null {
                var bookingIdList = List.nil<V>();
                bookingIdList := List.push(value, bookingIdList);
                // treeMap.put(key, bookingIdList);
                let updatedTrie = Trie.put(treeMap, textKey key, Text.equal, bookingIdList).0;

                return {value; updatedTrie};
            };
        };
    };
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
    public func checkKeyExist<V>(key : Text, trie : Trie.Trie<Text, V>) : Bool {
        switch (Trie.get(trie, textKey key, Text.equal)) {
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
        return date;
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
