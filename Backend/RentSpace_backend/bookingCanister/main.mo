import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Icrc "icrc";

import Types "Types";
import Utils "../utils";

shared ({caller = owner}) actor class () = this {
    stable var hotelCanisterId = "wkpuj-piaaa-aaaan-qlwta-cai";
    stable var bookingDataMap = Trie.empty<Types.BookingId, Types.BookingInfo>();
    stable var userXBookingIdMap = Trie.empty<Types.UserId, List.List<Types.BookingId>>();
    stable var hotelXBookingIdMap = Trie.empty<Types.HotelId, List.List<Types.BookingId>>();
    stable var bookingFrequencyMap = Trie.empty<Types.Year, Types.AnnualData>();

    stable var admin : [Types.AdminId] = [];
    stable let icpLedger = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    stable let ckbtcLedger = "r7inp-6aaaa-aaaaa-aaabq-cai";
    let hotelActor = actor (hotelCanisterId) : actor {
        checkHotelExist : shared query (Text) -> async Bool;
    };

    func validate(bookingData : Types.BookingInfo) {
        if (Utils.validText(bookingData.userId, 70) == false or Utils.validText(bookingData.date, 20) == false or Utils.validText(bookingData.bookingDuration, 20) == false or Utils.validText(bookingData.paymentId, 20) == false) {
            Debug.trap("Error! Text overflow");
        };
    };
    func getHotelOwnerIdFromHotelId(hotelId : Types.HotelId) : Text {

        let array = Iter.toArray(Text.split(hotelId, #char '#'));
        array[0];
    };
    func createBookingId(userIdentity : Text, hotelId : Text) : async Text {
        let uuid = await Utils.getUuid();
        let date = Utils.getDate();
        let bookingId = hotelId # "#" # date # "#" #uuid;
        let {updatedTrie} = Utils.putIdInList<Types.BookingId>(userIdentity, bookingId, userXBookingIdMap);
        userXBookingIdMap := updatedTrie;
        let hotelIdData = Utils.putIdInList<Types.BookingId>(hotelId, bookingId, hotelXBookingIdMap);
        hotelXBookingIdMap := hotelIdData.updatedTrie;
        hotelIdData.value;
    };

    public shared ({caller = user}) func bookHotel(hotelId : Types.HotelId, bookingInfo : Types.BookingInfo, paymentOption : {#icp; #ckbtc; #solana : Text}, amount : Nat) : async Text {
        let userIdentity = Principal.toText(user);
        if (Principal.isAnonymous(user) == true) {
            Debug.trap("Error! You are already a user");
        };
        validate(bookingInfo);
        let hotelExistStatus = await hotelActor.checkHotelExist(hotelId);
        if (hotelExistStatus == false) {
            Debug.trap(" No Hotel Exist");
        };
        bookingFrequencyMap := Utils.updateAnnualStatus(bookingFrequencyMap);
        let bookingDate = Utils.getDate();
        let bookingId = await createBookingId(userIdentity, hotelId);

        let hotelOwnerId = Principal.fromText(getHotelOwnerIdFromHotelId(hotelId));
        switch (paymentOption) {
            case (#icp) {
                let response : Icrc.Result_2 = await icrc2_transferFrom(icpLedger, user, hotelOwnerId, amount);

                switch (response) {
                    case (#Ok(value)) {
                        let bookingData : Types.BookingInfo = {
                            userId = userIdentity;
                            date = bookingDate;
                            bookingDuration = bookingInfo.bookingDuration;
                            checkInDate = bookingInfo.checkInDate;
                            hotelId = hotelId;
                            cancelStatus = false;
                            refundStatus = false;
                            paymentStatus = true;
                            paymentId = Nat.toText(value);
                        };
                        bookingDataMap := Trie.put(bookingDataMap, Utils.textKey bookingId, Text.equal, bookingData).0;
                        return " Sucessfully booked hotel";
                    };
                    case (#Err(error)) {return "Not found!"};
                };
            };
            case (#ckbtc) {
                let response : Icrc.Result_2 = await icrc2_transferFrom(ckbtcLedger, user, hotelOwnerId, amount);

                switch (response) {
                    case (#Ok(value)) {
                        let bookingData : Types.BookingInfo = {
                            userId = userIdentity;
                            date = bookingDate;
                            bookingDuration = bookingInfo.bookingDuration;
                            checkInDate = bookingInfo.checkInDate;
                            hotelId = hotelId;
                            cancelStatus = false;
                            refundStatus = false;
                            paymentStatus = true;
                            paymentId = Nat.toText(value);
                        };
                        bookingDataMap := Trie.put(bookingDataMap, Utils.textKey bookingId, Text.equal, bookingData).0;
                        return " Sucessfully booked hotel";
                    };
                    case (#Err(error)) {return "Not found!"};
                };
            };
            case (#solana(value)) {
                let bookingData : Types.BookingInfo = {
                    userId = userIdentity;
                    date = bookingDate;
                    bookingDuration = bookingInfo.bookingDuration;
                    checkInDate = bookingInfo.checkInDate;
                    hotelId = hotelId;
                    cancelStatus = false;
                    refundStatus = false;
                    paymentStatus = true;
                    paymentId = value;
                };
                bookingDataMap := Trie.put(bookingDataMap, Utils.textKey bookingId, Text.equal, bookingData).0;
                return " Sucessfully booked hotel";
            };
        };
    };

    public shared query ({caller = user}) func getBookingId() : async [Text] {
        let userId = Principal.toText(user);
        assert (Principal.isAnonymous(user) == false);
        switch (Trie.get(userXBookingIdMap, Utils.textKey userId, Text.equal)) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };

    public shared query ({caller}) func getBookingFrequencyInYear(year : Text) : async ?Types.AnnualData {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        // bookingFrequencyMap.get(year);
        Trie.get(bookingFrequencyMap, Utils.textKey year, Text.equal);
    };
    public shared query ({caller = user}) func gethotelXBookingId(hotelId : Text) : async [Text] {
        assert (Principal.isAnonymous(user) == false);
        switch (Trie.get(hotelXBookingIdMap, Utils.textKey hotelId, Text.equal)) {
            case null {[]};
            case (?result) {List.toArray<Text>(result)};
        };
    };
    public query func getBookingDetials(bookingId : Text) : async ?Types.BookingInfo {
        let bookingData = switch (Trie.get(bookingDataMap, Utils.textKey bookingId, Text.equal)) {
            case (null) {null};
            case (?data) {?data};
        };
        return bookingData;
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
            checkInDate = bookingInfo.checkInDate;
            hotelId = bookingInfo.hotelId;
            cancelStatus = bookingInfo.cancelStatus;
            refundStatus = bookingInfo.refundStatus;
            paymentStatus = bookingInfo.paymentStatus;
            paymentId = bookingInfo.paymentId;
        };

        bookingDataMap := Trie.put(bookingDataMap, Utils.textKey bookingId, Text.equal, bookingData).0;
    };

    public shared query func getNoOfPages(chunkSize : Nat) : async Nat {
        let data : [(Types.BookingId, Types.BookingInfo)] = Trie.toArray<Types.BookingId, Types.BookingInfo, (Types.BookingId, Types.BookingInfo)>(bookingDataMap, func(k, v) = (k, v));
        let allData = Utils.paginate<Types.BookingId, Types.BookingInfo>(data, chunkSize);
        allData.size();
    };
    public shared query ({caller}) func scanBooking(pageNo : Nat, chunkSize : Nat) : async [(Types.BookingId, Types.BookingInfo)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let data : [(Types.BookingId, Types.BookingInfo)] = Trie.toArray<Types.BookingId, Types.BookingInfo, (Types.BookingId, Types.BookingInfo)>(bookingDataMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Types.BookingId, Types.BookingInfo>(data, chunkSize);
        if (allData.size() <= pageNo) {
            Debug.trap("No page Exist");
        };
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
    public shared query ({caller}) func getAllAdmin() : async [Types.AdminId] {
        if (caller != owner) {
            return ["No Access"];
        };
        return admin;
    };

    func icrc2_transferFrom(ledgerId : Text, transferfrom : Principal, transferto : Principal, amount : Nat) : async Icrc.Result_2 {

        let ledger = actor (ledgerId) : Icrc.Token;
        await ledger.icrc2_transfer_from({
            spender_subaccount = null;
            from = {owner = transferfrom; subaccount = null};
            to = {owner = transferto; subaccount = null};
            amount;
            fee = null;
            memo = null;
            created_at_time = null;
        });

    };

};
