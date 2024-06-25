import Result "mo:base/Result";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Iter "mo:base/Iter";

import Utils "../utils";

shared ({caller = owner}) actor class () {
    type AdminId = Text;
    type CommentId = Text;
    type Comment = {
        comment : Text;
        hotelId : Text;
        userId : Text;
        parentCommentId : Text;
        createdAt : Text;
    };
    type Result = Result.Result<Text, (Error.ErrorCode, Text)>;
    var hotelCanisterId = "wbxey-saaaa-aaaao-a3oeq-cai";

    stable var hotelCommentMap = Trie.empty<Text, [(CommentId, Comment)]>();
    stable var admin : [AdminId] = [];

    let hotelActor = actor (hotelCanisterId) : actor {
        checkHotelExist : query (Text) -> async Bool;
    };

    public shared ({caller}) func createComment(hotelId : Text, commentId : Text, userComment : Text) : async Result {

        let uuid = await Utils.getUuid();
        let commentInfo : Comment = {
            comment = userComment;
            hotelId = hotelId;
            userId = Principal.toText(caller);
            parentCommentId = commentId;
            createdAt = Utils.getDate();
        };
        let newCommentId = hotelId # "#" # uuid;
        var sucessMessage = "";
        try {
            assert (Text.size(userComment) <= 500 and Principal.isAnonymous(caller) == false);
            let hotelExistStatus = await hotelActor.checkHotelExist(hotelId);
            if (hotelExistStatus == false) {
                Debug.trap("No Hotel Exist !");
            };
            switch (Trie.get(hotelCommentMap, Utils.textKey hotelId, Text.equal)) {
                case (null) {
                    hotelCommentMap := Trie.put(hotelCommentMap, Utils.textKey hotelId, Text.equal, [(newCommentId, commentInfo)]).0;
                    // hotelCommentMap.put(hotelId, [(newCommentId, commentInfo)]);
                    sucessMessage := "Create the first  comment on the Hotel";
                };
                case (?r) {
                    let commentMap = HashMap.fromIter<Text, Comment>(r.vals(), 1, Text.equal, Text.hash);
                    switch (commentMap.get(newCommentId)) {
                        case (null) {
                            commentMap.put(newCommentId, commentInfo);
                            hotelCommentMap := Trie.put(hotelCommentMap, Utils.textKey hotelId, Text.equal, Iter.toArray(commentMap.entries())).0;
                            // hotelCommentMap.put(hotelId, Iter.toArray(commentMap.entries()));
                            sucessMessage := "new Comment inserted in hotel";
                        };
                        case (?r) {
                            Debug.trap("comment of this id already exist");
                        };
                    };
                };
            };
            #ok(sucessMessage);
        } catch (e) {
            let code = Error.code(e);
            let message = Error.message(e);
            #err(code, message);
        };
    };

    public shared query ({caller}) func getComments(hotelId : Text) : async [(CommentId, Comment)] {
        assert (Principal.isAnonymous(caller) == false);
        switch (Trie.get(hotelCommentMap, Utils.textKey hotelId, Text.equal)) {
            case (null) {Debug.trap("no Comment found in this hotelId")};
            case (?value) {value};
        };
    };

    public shared query ({caller}) func getSingleComments(hotelId : Text, commentId : Text) : async Comment {
        assert (Principal.isAnonymous(caller) == false);

        switch (Trie.get(hotelCommentMap, Utils.textKey hotelId, Text.equal)) {
            case (null) {
                Debug.trap("no Comment found in this hotelId");
            };
            case (?value) {
                let commentMap = HashMap.fromIter<Text, Comment>(value.vals(), 1, Text.equal, Text.hash);
                switch (commentMap.get(commentId)) {
                    case (null) {

                        Debug.trap("comment of this id already exist");
                    };
                    case (?r) {
                        r;
                    };
                };
            };
        };
    };

    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };
    public shared query ({caller}) func scanComment(pageNo : Nat, chunkSize : Nat) : async [(Text, [(CommentId, Comment)])] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let data : [(CommentId, [(CommentId, Comment)])] = Trie.toArray<CommentId, [(CommentId, Comment)], (CommentId, [(CommentId, Comment)])>(hotelCommentMap, func(k, v) = (k, v));
        let allData = Utils.paginate<Text, [(CommentId, Comment)]>(data, chunkSize);
        allData[pageNo];
    };

    public shared ({caller}) func addOwner(ownerIds : AdminId) : async Text {
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
    public shared query ({caller}) func getAllAdmin() : async [AdminId] {
        if (caller != owner) {
            return ["No Access"];
        };
        return admin;
    };
};
