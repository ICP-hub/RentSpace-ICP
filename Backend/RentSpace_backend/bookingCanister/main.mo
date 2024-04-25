import Text "mo:base/Text";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Trie "mo:base/Trie";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Error "mo:base/Error";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Icrc "icrc";

import Api "./api";
import Types "Types";
import Utils "../utils";

shared ({caller = owner}) actor class () = this {
    stable var hotelCanisterId = "wkpuj-piaaa-aaaan-qlwta-cai";
    stable var bookingDataMap = Trie.empty<Types.BookingId, Types.BookingInfo>();
    stable var userXBookingIdMap = Trie.empty<Types.UserId, List.List<Types.BookingId>>();
    stable var hotelXBookingIdMap = Trie.empty<Types.HotelId, List.List<Types.BookingId>>();
    stable var bookingFrequencyMap = Trie.empty<Types.Year, Types.AnnualData>();
    stable var hotelIdBookedDurations = Trie.empty<Types.HotelId, Trie.Trie<Types.BookingId, Types.BookingDuration>>();

    stable var admin : [Types.AdminId] = [];
    stable let icpLedger = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    stable let ckbtcLedger = "r7inp-6aaaa-aaaaa-aaabq-cai";
    let hotelActor = actor (hotelCanisterId) : actor {
        checkHotelExist : shared query (Text) -> async Bool;
        getHotelAvailabilty : query (Text) -> async ?{
            hotelAvailableFrom : Text;
            hotelAvailableTill : Text;
        };
    };

    func validate(bookingData : Types.BookingInfo) {
        if (Utils.validText(bookingData.userId, 70) == false or Utils.validText(bookingData.date, 20) == false or Utils.validText(bookingData.paymentId, 20) == false) {
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
    func bookingDuration(hotelId : Types.HotelId, bookingId : Text, bookingDuration : Types.BookingDuration) : async () {
        let {hotelAvailableFrom; hotelAvailableTill} = switch (await hotelActor.getHotelAvailabilty(hotelId)) {
            case (?value) {value};
            case (null) {throw Error.reject("No Hotel Found")};
        };

        if (bookingDuration.bookedAt < hotelAvailableFrom or hotelAvailableTill < bookingDuration.bookedTill) {
            throw Error.reject("Invalid Time Durations");
        };

        let hotelBookingDurationData = Trie.get(hotelIdBookedDurations, Utils.textKey hotelId, Text.equal);
        switch (hotelBookingDurationData) {
            case (?value) {
                let hotelIdDurationData = value;
                switch (Trie.get(hotelIdDurationData, Utils.textKey hotelId, Text.equal)) {
                    case (null) {
                        let durationData = Trie.toArray<Types.BookingId, Types.BookingDuration, Types.BookingDuration>(value, func(k, v) = v);
                        for (item in durationData.vals()) {
                            if (item.bookedAt < bookingDuration.bookedAt and bookingDuration.bookedTill < item.bookedTill) {
                                throw Error.reject("Already Booked Hotel At this time duration");
                            };
                        };
                        let bookingDurationTrie = Trie.put(hotelIdDurationData, Utils.textKey bookingId, Text.equal, bookingDuration).0;
                        hotelIdBookedDurations := Trie.put(hotelIdBookedDurations, Utils.textKey hotelId, Text.equal, bookingDurationTrie).0;
                    };
                    case (?v) {
                        throw Error.reject("already added time durations");
                    };
                };
            };
            case (null) {
                let emptyBookingDuration = Trie.empty<Types.BookingId, Types.BookingDuration>();
                let bookingDurationTrie = Trie.put(emptyBookingDuration, Utils.textKey bookingId, Text.equal, bookingDuration).0;
                hotelIdBookedDurations := Trie.put(hotelIdBookedDurations, Utils.textKey hotelId, Text.equal, bookingDurationTrie).0;
            };
        };

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
                        await bookingDuration(hotelId, bookingId, bookingInfo.bookingDuration);
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
                        await bookingDuration(hotelId, bookingId, bookingInfo.bookingDuration);
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
    public func hotelBookingDuration(hotelId : Types.HotelId) : async [(Types.BookingId, Types.BookingDuration)] {
        let durationData : Trie.Trie<Types.BookingId, Types.BookingDuration> = switch (Trie.get(hotelIdBookedDurations, Utils.textKey hotelId, Text.equal)) {
            case (null) {throw Error.reject("Hotel has not been booked by any")};
            case (?v) {v};
        };
        let duration : [(Types.BookingId, Types.BookingDuration)] = Trie.toArray<Types.BookingId, Types.BookingDuration, (Types.BookingId, Types.BookingDuration)>(durationData, func(k, v) = (k, v));
        return duration;
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
    public func get_icp_usd_exchange() : async Text {

        let ic : Api.IC = actor ("aaaaa-aa");

        let url = "https://api.coinbase.com/v2/exchange-rates?currency=USD";

        let request_headers = [
            {name = "Accept"; value = "*/*"},
            {name = "User-Agent"; value = url},
        ];
        let transform_context : Api.TransformContext = {
            function = transform;
            context = Blob.fromArray([]);
        };

        let http_request : Api.HttpRequestArgs = {
            url = url;
            max_response_bytes = null; //optional for request
            headers = request_headers;
            body = null; //optional for request
            method = #get;
            transform = ?transform_context;
        };

        Cycles.add<system>(20_949_972_000);

        let http_response : Api.HttpResponsePayload = await ic.http_request(http_request);

        let response_body : Blob = Blob.fromArray(http_response.body);
        let decoded_text : Text = switch (Text.decodeUtf8(response_body)) {
            case (null) {"No value returned"};
            case (?y) {y};
        };

        decoded_text;
    };

    public query func transform(raw : Api.TransformArgs) : async Api.CanisterHttpResponsePayload {
        let transformed : Api.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                {
                    name = "Content-Security-Policy";
                    value = "default-src 'self'";
                },
                {name = "Referrer-Policy"; value = "strict-origin"},
                {name = "Permissions-Policy"; value = "geolocation=(self)"},
                {
                    name = "Strict-Transport-Security";
                    value = "max-age=63072000";
                },
                {name = "X-Frame-Options"; value = "DENY"},
                {name = "X-Content-Type-Options"; value = "nosniff"},
            ];
        };
        transformed;
    };

};
