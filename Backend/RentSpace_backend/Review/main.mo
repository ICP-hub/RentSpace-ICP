import Types "Types";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Utils "../utils";

shared ({caller = owner}) actor class Review() {
    var hotelIdReviewIdMap = HashMap.HashMap<Types.HotelId, List.List<Types.ReviewId>>(0, Text.equal, Text.hash);
    var reviewDataMap = HashMap.HashMap<Types.ReviewId, Types.Review>(0, Text.equal, Text.hash);
    var reviewIdMap = HashMap.HashMap<Types.UserId, List.List<Types.ReviewId>>(0, Text.equal, Text.hash);
    stable var admin : [Types.AdminId] = [];

    func createReviewId(userIdentity : Text, bookingId : Text) : () {
        switch (reviewIdMap.get(userIdentity)) {
            case (?result) {
                let data = List.push(bookingId, result);
                reviewIdMap.put(userIdentity, data);
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                reviewIdMap.put(userIdentity, reviewIdList);
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
        switch (hotelIdReviewIdMap.get(hotelId)) {
            case (?result) {
                let data = List.push(bookingId, result);
                hotelIdReviewIdMap.put(hotelId, data);
                return;
            };
            case null {
                var reviewIdList = List.nil<Text>();
                reviewIdList := List.push(bookingId, reviewIdList);
                hotelIdReviewIdMap.put(hotelId, reviewIdList);
                return;
            };
        };
    };
    func validate(reviewData : Types.Review) {
        if (Utils.validText(reviewData.bookingId, 170) == false or reviewData.rating <= 5 or Utils.validText(reviewData.title, 70) == false or Utils.validText(reviewData.createdAt, 20) == false or Utils.validText(reviewData.des, 1000))  {
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
        createReviewId(userIdentity, bookingId);
        linkReviewIdwithHotelId(bookingId);
        let review = {
            bookingId = reviewData.bookingId;
            rating = reviewData.rating;
            title = reviewData.title;
            des = reviewData.des;
            createdAt = date;
        };
        reviewDataMap.put(bookingId, review);
    };
    public query func getReviewInfo(bookingId : Text) : async ?Types.Review {
        reviewDataMap.get(bookingId);
    };

    public query func getReviewIdsFromHotelId(hotelId : Types.HotelId) : async [Types.ReviewId] {

        // assert (Principal.isAnonymous(user) == false)
        let data : [Text] = switch (hotelIdReviewIdMap.get(hotelId)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
    };
    public shared query ({caller = user}) func getHotelId() : async [Types.ReviewId] {
        let userIdentity = Principal.toText(user);

        switch (reviewIdMap.get(userIdentity)) {
            case (null) {[]};
            case (?result) {List.toArray(result)};
        };
    };

    public shared ({caller = user}) func updateReviewInfo(bookingId : Text, reviewData : Types.Review) : async ?Types.Review {

        if (Principal.isAnonymous(user) == false or Utils.checkKeyExist<Types.ReviewId, Types.Review>(bookingId, reviewDataMap) == false) {
            Debug.trap("No Access");
        };

        let userIdentity = Principal.toText(user);

        let review = {
            bookingId = bookingId;
            rating = reviewData.rating;
            title = reviewData.title;
            des = reviewData.des;
            createdAt = Utils.getDate();
        };
        reviewDataMap.replace(bookingId, review);
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };
    public shared query ({caller}) func scanReview(pageNo : Nat, chunkSize : Nat) : async [(Types.ReviewId, Types.Review)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let allData = Utils.paginate<Types.ReviewId, Types.Review>(Iter.toArray(reviewDataMap.entries()), chunkSize);
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
};
