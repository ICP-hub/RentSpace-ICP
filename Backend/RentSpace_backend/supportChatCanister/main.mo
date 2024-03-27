import Result "mo:base/Result";
import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Trie "mo:base/Trie";
import Utils "../utils";

shared ({caller = owner}) actor class () {
    type AdminId = Text;

    type TicketId = Text;

    type Address = {
        region : Text;
        streetAddress : Text;
        building : Text;
        city : Text;
        country : Text;
        postalCode : Text;
    };

    type Ticket = {
        messageToHost : Text;
        messageToAdmin : Text;
        reason : Text;
        customerId : Text;
        resolved : Bool;
        address : Address;
        createdAt : Text;
    };

    type UserIdentity = Text;

    type Issue = {
        message : Text;
        reply : ?Text;
    };

    type Result = Result.Result<Text, (Error.ErrorCode, Text)>;

    stable var unResolvedIssueMap = Trie.empty<UserIdentity, List.List<Issue>>();
    stable var resolvedIssueMap = Trie.empty<UserIdentity, List.List<Issue>>();
    stable var ticketMap = Trie.empty<Text, [(TicketId, Ticket)]>();

    stable var admin : [AdminId] = [];

    public shared ({caller}) func createIssue(message : Text) : async Result {
        try {
            if (Principal.isAnonymous(caller) == true or Utils.validText(message, 300) == false) {
                Debug.trap("No user found of this Identity");
            };
            let issue : Issue = {
                message;
                reply = null;
            };
            let userIdentity = Principal.toText(caller);
            switch (Trie.get(unResolvedIssueMap, Utils.textKey userIdentity, Text.equal)) {
                case (null) {
                    unResolvedIssueMap := Trie.put(unResolvedIssueMap, Utils.textKey userIdentity, Text.equal, List.push(issue, List.nil<Issue>())).0;
                    // unResolvedIssueMap.put(Principal.toText(caller), List.push(issue, List.nil<Issue>()));
                };
                case (?data) {
                    let temp = List.push(issue, data);
                    unResolvedIssueMap := Trie.put(unResolvedIssueMap, Utils.textKey userIdentity, Text.equal, temp).0;

                    // unResolvedIssueMap.put(Principal.toText(caller), temp);
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
        let userIdentity = Principal.toText(caller);
        switch (
            Trie.get(unResolvedIssueMap, Utils.textKey userIdentity, Text.equal)
            // unResolvedIssueMap.get(Principalxt(caller))
        ) {
            case (null) {[]};
            case (?value) {List.toArray(value)};
        };
    };
    public shared query ({caller}) func getResolvedIssue() : async [Issue] {
        let userIdentity = Principal.toText(caller);

        switch (
            Trie.get(resolvedIssueMap, Utils.textKey userIdentity, Text.equal)
            // resolvedIssueMap.get(Principal.toText(caller))
        ) {
            case (null) {[]};
            case (?value) {
                List.toArray(value);
            };
        };
    };

    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };

    public query func getAllUnResolvedIssue() : async [UserIdentity] {
        let allData : [UserIdentity] = Trie.toArray<UserIdentity, List.List<Issue>, UserIdentity>(unResolvedIssueMap, func(k, v) = k);
        return allData;
    };
    public func resolveUserIssue(userId : UserIdentity, reply : Text) : async () {
        let resolvedIssue : Issue = switch (
            Trie.get(unResolvedIssueMap, Utils.textKey userId, Text.equal)
            // unResolvedIssueMap.get(userId)
        ) {
            case (null) {Debug.trap("Invalid UserId")};
            case (?result) {
                let unResolvedIssues = List.toArray(result);
                let {message} = unResolvedIssues[0];

                let updatedUnResolvedIssue = List.drop<Issue>(result, 1);
                unResolvedIssueMap := Trie.put(unResolvedIssueMap, Utils.textKey userId, Text.equal, updatedUnResolvedIssue).0;

                // unResolvedIssueMap.put(userId, updatedUnResolvedIssue);
                {
                    message;
                    reply = ?reply;
                };
            };
        };
        switch (
            Trie.get(resolvedIssueMap, Utils.textKey userId, Text.equal)
            // resolvedIssueMap.get(userId)
        ) {
            case (null) {
                resolvedIssueMap := Trie.put(resolvedIssueMap, Utils.textKey userId, Text.equal, List.push(resolvedIssue, List.nil<Issue>())).0;

                // resolvedIssueMap.put(Principal.toText(caller), List.push(resolvedIssue, List.nil<Issue>()));
            };
            case (?value) {
                unResolvedIssueMap := Trie.put(unResolvedIssueMap, Utils.textKey userId, Text.equal, List.push(resolvedIssue, value)).0;
                // unResolvedIssueMap.put(Principal.toText(caller), List.push(resolvedIssue, value));
            };
        };
    };

    // Ticket raising functions and type

    public shared ({caller = user}) func raiseNewTicket(reason : Text, hostMessage : Text, adminMessage : Text, address : Address) : async Result {

        assert (Principal.isAnonymous(user) == false);
        let userId = Principal.toText(user);
        let uuid = await Utils.getUuid();
        let ticketId = userId # "#" # uuid;
        let userTextId = Principal.toText(user);

        let ticketInfo : Ticket = {
            messageToHost = hostMessage;
            messageToAdmin = adminMessage;
            reason = reason;
            customerId = userTextId;
            resolved = false;
            address = address;
            createdAt = Utils.getDate();
        };

        var resultMessage = "";

        try {
            switch (
                Trie.get(ticketMap, Utils.textKey userTextId, Text.equal)
                // ticketMap.get(userTextId)
            ) {
                case (null) {
                    ticketMap := Trie.put(ticketMap, Utils.textKey userTextId, Text.equal, [(ticketId, ticketInfo)]).0;
                    // ticketMap.put(userTextId, [(ticketId, ticketInfo)]);
                    resultMessage := "Raising the first comment for the user";
                };
                case (?r) {
                    let ticketSubMap = HashMap.fromIter<Text, Ticket>(r.vals(), 1, Text.equal, Text.hash);
                    ticketSubMap.put(ticketId, ticketInfo);
                    ticketMap := Trie.put(ticketMap, Utils.textKey userTextId, Text.equal, Iter.toArray(ticketSubMap.entries())).0;
                    // ticketMap.put(userTextId, Iter.toArray(ticketSubMap.entries()));
                    resultMessage := "Raised a new issue!";
                };
            };
            #ok(resultMessage);
        } catch (e) {
            let code = Error.code(e);
            let message = Error.message(e);
            #err(code, message);
        };

    };

    public shared query ({caller = user}) func getTicket() : async [(TicketId, Ticket)] {
        assert (Principal.isAnonymous(user) == false);
        let userTextId = Principal.toText(user);
        switch (
            Trie.get(ticketMap, Utils.textKey userTextId, Text.equal)
            // ticketMap.get(userTextId)
        ) {
            case (null) {Debug.trap("no Issue found raised by this user")};
            case (?value) {value};
        };
    };

    public shared query ({caller = user}) func getUserTicketsByAdmin(userId : Text) : async [(TicketId, Ticket)] {
        if (Utils.getOwnerFromArray(user, admin) == false) {
            Debug.trap("Not Authorased");
        };
        switch (
            Trie.get(ticketMap, Utils.textKey userId, Text.equal)
            // ticketMap.get(userId)
        ) {
            case (null) {Debug.trap("no Issue found raised by this user")};
            case (?value) {value};
        };

    };

    public shared ({caller = user}) func resolveTicketRaised(ticketId : Text, userId : Text) : async Result {
        if (Utils.getOwnerFromArray(user, admin) == false) {
            Debug.trap("Not Authorased");
        };
        try {

            var resultMessage = "";

            switch (
                Trie.get(ticketMap, Utils.textKey userId, Text.equal)
                // ticketMap.get(userId)
            ) {
                case (null) {
                    Debug.trap("no Issue found raised by this user");
                };
                case (?value) {
                    let ticketSubMap = HashMap.fromIter<Text, Ticket>(value.vals(), 1, Text.equal, Text.hash);
                    switch (ticketSubMap.get(ticketId)) {
                        case (null) {
                            Debug.trap("No issue found with this id");
                        };
                        case (?value) {
                            let previousTicket : Ticket = value;
                            let newTicket : Ticket = {
                                messageToHost = previousTicket.messageToHost;
                                messageToAdmin = previousTicket.messageToAdmin;
                                reason = previousTicket.reason;
                                customerId = previousTicket.customerId;
                                resolved = true;
                                address = previousTicket.address;
                                createdAt = previousTicket.createdAt;
                            };
                            let prevMap = ticketSubMap.replace(ticketId, newTicket);
                            ticketMap := Trie.put(ticketMap, Utils.textKey userId, Text.equal, Iter.toArray(ticketSubMap.entries())).0;
                            resultMessage := "Successfully resolved the ticket!";
                        };
                    };
                };

            };
            #ok(resultMessage);
        } catch (e) {
            let code = Error.code(e);
            let message = Error.message(e);
            #err(code, message);
        };
    };
    public shared query ({caller}) func isAdmin() : async Bool {
        Utils.getOwnerFromArray(caller, admin);
    };

    public shared ({caller = user}) func removeResolvedTicketRaised(ticketId : Text, userId : Text) : async Result {
        assert (Principal.isAnonymous(user));
        try {

            var resultMessage = "";

            switch (
                Trie.get(ticketMap, Utils.textKey userId, Text.equal)
                // ticketMap.get(userId)
            ) {
                case (null) {
                    Debug.trap("no Issue found raised by this user");
                };
                case (?value) {
                    let ticketSubMap = HashMap.fromIter<Text, Ticket>(value.vals(), 1, Text.equal, Text.hash);
                    switch (ticketSubMap.get(ticketId)) {
                        case (null) {
                            Debug.trap("No issue found with this id");
                        };
                        case (?value) {
                            ticketMap := Trie.remove(ticketMap, Utils.textKey userId, Text.equal).0;
                            // ticketMap.delete(userId);
                            ticketSubMap.delete(ticketId);
                            ticketMap := Trie.put(ticketMap, Utils.textKey userId, Text.equal, Iter.toArray(ticketSubMap.entries())).0;
                            // ticketMap.put(userId, Iter.toArray(ticketSubMap.entries()));
                            resultMessage := "Successfully removed the issue!";
                        };
                    };
                };

            };
            #ok(resultMessage);
        } catch (e) {
            let code = Error.code(e);
            let message = Error.message(e);
            #err(code, message);
        };
    };
    public shared query func getNoOfPages(chunkSize : Nat) : async Nat {
        let data : [(Text, [(TicketId, Ticket)])] = Trie.toArray<TicketId, [(TicketId, Ticket)], (TicketId, [(TicketId, Ticket)])>(ticketMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Text, [(TicketId, Ticket)]>(data, chunkSize);
        allData.size();
    };
    public shared query ({caller}) func scanBooking(pageNo : Nat, chunkSize : Nat) : async [(Text, [(TicketId, Ticket)])] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let data : [(Text, [(TicketId, Ticket)])] = Trie.toArray<TicketId, [(TicketId, Ticket)], (TicketId, [(TicketId, Ticket)])>(ticketMap, func(k, v) = (k, v));

        let allData = Utils.paginate<Text, [(TicketId, Ticket)]>(data, chunkSize);
        if (allData.size() <= pageNo) {
            Debug.trap("No page Exist");
        };
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
