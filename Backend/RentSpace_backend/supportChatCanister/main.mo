import Result "mo:base/Result";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import List "mo:base/List";

import Utils "../utils";

shared ({caller = owner}) actor class () {
    type UserIdentity = Text;
    type Issue = {
        message : Text;
        reply : ?Text;
    };
    type Result = Result.Result<Text, (Error.ErrorCode, Text)>;
    var issueDataMap = HashMap.HashMap<UserIdentity, List.List<Issue>>(0, Text.equal, Text.hash);
    stable var entries : [(UserIdentity, List.List<Issue>)] = [];

    public shared ({caller}) func createIssue(message : Text) : async Result {

        try {
            if (Principal.isAnonymous(caller) == true or Utils.validText(message, 300) == false) {
                Debug.trap("No user found of this Identity");
            };
            let issue : Issue = {
                message;
                reply = null;
            };
            switch (issueDataMap.get(Principal.toText(caller))) {
                case (null) {
                    issueDataMap.put(Principal.toText(caller), List.push(issue, List.nil<Issue>()));
                };
                case (?data) {
                    let temp = List.push(issue, data);
                    issueDataMap.put(Principal.toText(caller), temp);
                };
            };
            #ok("Sucessfully Create the Issue");
        } catch (e) {
            let code = Error.code(e);
            let message = Error.message(e);
            #err(code, message);
        };
    };

    public shared query ({caller}) func getAllUserIssue() : async [Issue] {
        switch (issueDataMap.get(Principal.toText(caller))) {
            case (null) {[]};
            case (?value) {List.toArray(value)};
        };
    };
    public shared query ({caller}) func getResolvedIssue() : async [Issue] {
        var resolvedIssue : List.List<Issue> = List.nil<Issue>();
        switch (issueDataMap.get(Principal.toText(caller))) {
            case (null) {};
            case (?value) {
                for (issue in List.toIter(value)) {
                    if (issue.reply != null) {
                        resolvedIssue := List.push(issue, resolvedIssue);
                    };
                };

            };
        };
        List.toArray(resolvedIssue);
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };

    system func preupgrade() {
        entries := Iter.toArray(issueDataMap.entries());
    };

    system func postupgrade() {
        issueDataMap := HashMap.fromIter<Text, List.List<Issue>>(entries.vals(), 1, Text.equal, Text.hash);
        entries := [];
    };
};
