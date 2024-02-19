import Result "mo:base/Result";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

import Utils "../utils";

shared ({caller = owner}) actor class () {
    type CommentId = Text;
    type Comment = {
        comment : Text;
        hotelId : Text;
        userId : Text;
        parentCommentId : Text;
        createdAt : Text;
    };
    type Result = Result.Result<Text, (Error.ErrorCode, Text)>;
    var hotelCommentMap = HashMap.HashMap<Text, [(CommentId, Comment)]>(0, Text.equal, Text.hash);
    stable var entries : [(Text, [(CommentId, Comment)])] = [];

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
            switch (hotelCommentMap.get(hotelId)) {
                case (null) {
                    hotelCommentMap.put(hotelId, [(newCommentId, commentInfo)]);
                    sucessMessage := "Create the first  comment on the Hotel";
                };
                case (?r) {
                    let commentMap = HashMap.fromIter<Text, Comment>(r.vals(), 1, Text.equal, Text.hash);
                    switch (commentMap.get(newCommentId)) {
                        case (null) {
                            commentMap.put(newCommentId, commentInfo);
                            hotelCommentMap.put(hotelId, Iter.toArray(commentMap.entries()));
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
        switch (hotelCommentMap.get(hotelId)) {
            case (null) {Debug.trap("no Comment found in this hotelId")};
            case (?value) {value};
        };
    };

    public shared query ({caller}) func getSingleComments(hotelId : Text, commentId : Text) : async Comment {
        assert (Principal.isAnonymous(caller) == false);

        switch (hotelCommentMap.get(hotelId)) {
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

    //Pre and post upgrade

    system func preupgrade() {
        entries := Iter.toArray(hotelCommentMap.entries());
    };

    system func postupgrade() {
        hotelCommentMap := HashMap.fromIter<Text, [(Text, Comment)]>(entries.vals(), 1, Text.equal, Text.hash);
        entries := [];
    };
};
