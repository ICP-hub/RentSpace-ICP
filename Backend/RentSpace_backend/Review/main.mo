import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Text "mo:base/Text";

import Types "Types";

import Utils "../utils";

shared ({caller = owner}) actor class Review() {
    stable var hotelIdReviewIdMap = Trie.empty<Types.HotelId, List.List<Types.ReviewId>>();
    stable var reviewDataMap = Trie.empty<Types.ReviewId, Types.Review>();
    stable var reviewIdMap = Trie.empty<Types.UserId, List.List<Types.ReviewId>>();
    stable var admin : [Types.AdminId] = [];

    func createReviewId(userIdentity : Text, bookingId : Text) : () {
        switch (Trie.get(reviewIdMap, Utils.textKey userIdentity, Text.equal)) {
            case (?result) {
                let data = List.push(bookingId, result);
                reviewIdMap := Trie.put(reviewIdMap, Utils.textKey userIdentity, Text.equal, data).0;
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                reviewIdMap := Trie.put(reviewIdMap, Utils.textKey userIdentity, Text.equal, reviewIdList).0;
                return;
            };
        };

    };

    func linkReviewIdwithHotelId(bookingId : Text) {
        let reviewId = Text.split(bookingId, #text "#");
        var loopCount = 0;
        var hotelId = "";
        for (i in reviewId) {
            if (loopCount < 1) {
                hotelId := hotelId # i;
            };
            if (loopCount == 1) {
                hotelId := hotelId # "#" #i;
            };
            loopCount := loopCount +1;
        };

        Debug.print(debug_show (hotelId));
        switch (Trie.get(hotelIdReviewIdMap, Utils.textKey hotelId, Text.equal)) {
            case (?result) {
                let data = List.push(bookingId, result);
                hotelIdReviewIdMap := Trie.put(hotelIdReviewIdMap, Utils.textKey hotelId, Text.equal, data).0;
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                hotelIdReviewIdMap := Trie.put(hotelIdReviewIdMap, Utils.textKey hotelId, Text.equal, reviewIdList).0;
                return;
            };
        };
    };

    func validate(reviewData : Types.Review) {
        if (Utils.validText(reviewData.bookingId, 170) == false or reviewData.rating > 5 or Utils.validText(reviewData.title, 70) == false or Utils.validText(reviewData.createdAt, 20) == false or Utils.validText(reviewData.des, 1000) == false) {
            Debug.trap("Error! Text overflow");
        };
    };

    public shared ({caller}) func createReview(bookingId : Text, reviewData : Types.Review) {
        let userIdentity = Principal.toText(caller);
        if (Principal.isAnonymous(caller) == true) {
            Debug.trap("NO acess");
        };
        validate(reviewData);
        let date = Utils.getDate();
        switch (Trie.get(reviewIdMap, Utils.textKey userIdentity, Text.equal)) {
            case (null) {
                // Debug.print(debug_show (""));
                createReviewId(userIdentity,bookingId);
                linkReviewIdwithHotelId(bookingId);
                let review = {
                    bookingId = reviewData.bookingId;
                    rating = reviewData.rating;
                    title = reviewData.title;
                    des = reviewData.des;
                    createdAt = date;
                };
                reviewDataMap := Trie.put(reviewDataMap, Utils.textKey bookingId, Text.equal, review).0;

            };
            case (?result) {
                switch (List.find<Types.ReviewId>(result, func x {x == bookingId})) {
                    case (null) {
                        createReviewId(userIdentity, bookingId);
                        linkReviewIdwithHotelId(bookingId);
                        let review = {
                            bookingId = reviewData.bookingId;
                            rating = reviewData.rating;
                            title = reviewData.title;
                            des = reviewData.des;
                            createdAt = date;
                        };
                        // reviewDataMap.put(bookingId, review);
                        reviewDataMap := Trie.put(reviewDataMap, Utils.textKey bookingId, Text.equal, review).0;
                    };
                    case (?v) {

                        let review = {
                            bookingId = reviewData.bookingId;
                            rating = reviewData.rating;
                            title = reviewData.title;
                            des = reviewData.des;
                            createdAt = date;
                        };
                        // reviewDataMap.put(bookingId, review);
                        reviewDataMap := Trie.put(reviewDataMap, Utils.textKey v, Text.equal, review).0;
                    };
                };
            };
        };
    };

    public query func getReviewInfo(bookingId : Text) : async ?Types.Review {
        // reviewDataMap.get(bookingId);
        Trie.get(reviewDataMap, Utils.textKey bookingId, Text.equal);
    };

    public query func getReviewIdsFromHotelId(hotelId : Types.HotelId) : async [Types.ReviewId] {

        // assert (Principal.isAnonymous(user) == false)
        let data : [Text] = switch (Trie.get(hotelIdReviewIdMap, Utils.textKey hotelId, Text.equal)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
        return data;
    };

    public shared query ({caller = user}) func getHotelId() : async [Types.ReviewId] {
        let userIdentity = Principal.toText(user);

        switch (Trie.get(reviewIdMap, Utils.textKey userIdentity, Text.equal)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
    };

    public shared ({caller = user}) func updateReviewInfo(bookingId : Text, reviewData : Types.Review) : async ?Types.Review {

        if (Principal.isAnonymous(user) == false or Utils.checkKeyExist<Types.Review>(bookingId, reviewDataMap) == false) {
            Debug.trap("No Access");
        };

        // let userIdentity = Principal.toText(user);

        let review = {
            bookingId = bookingId;
            rating = reviewData.rating;
            title = reviewData.title;
            des = reviewData.des;
            createdAt = Utils.getDate();
        };
        // reviewDataMap.replace(bookingId, review);
        reviewDataMap := Trie.put(reviewDataMap, Utils.textKey bookingId, Text.equal, review).0;
        ?review;
    };

    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };
    public shared query func getNoOfPages(chunkSize : Nat) : async Nat {
        let data : [(Types.ReviewId, Types.Review)] = Trie.toArray<Types.ReviewId, Types.Review, (Types.ReviewId, Types.Review)>(reviewDataMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Types.ReviewId, Types.Review>(data, chunkSize);
        allData.size();
    };
    public shared query ({caller}) func scanReview(pageNo : Nat, chunkSize : Nat) : async [(Types.ReviewId, Types.Review)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let data : [(Types.ReviewId, Types.Review)] = Trie.toArray<Types.ReviewId, Types.Review, (Types.ReviewId, Types.Review)>(reviewDataMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Types.ReviewId, Types.Review>(data, chunkSize);
        if (allData.size() <= pageNo) {
            Debug.trap("No page Exist");
        };
        allData[pageNo];
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
};
