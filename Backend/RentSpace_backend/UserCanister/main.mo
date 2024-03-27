// Importing necessary modules
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

import Text "mo:base/Text";
import List "mo:base/List";
import Trie "mo:base/Trie";

import Types "Types";
import Utils "../utils";

// Defining the User actor class
shared ({caller = owner}) actor class User() {

    // HashMap to store user data
    stable var userDataMap = Trie.empty<Types.UserId, Types.UserInfo>();
    stable var admin : [Types.AdminId] = [];
    stable var annualRegisterFrequencyMap = Trie.empty<Types.Year, Types.AnnualData>();
    // Function to validate user creation data
    func createUserValidation(userData : Types.User) {
        // Checking if the user data is valid
        if (Utils.validText(userData.firstName, 20) == false or Utils.validText(userData.lastName, 20) == false or Utils.checkDate(userData.dob) == false or Utils.checkEmail(userData.userEmail) == false) {
            // Trapping an error if the data is invalid
            Debug.trap("Error! Text overflow");
        };
    };

    // Function to validate user update data
    func updateUserValidation(userData : Types.UserInfo) {
        // Checking if the user data is valid
        if (Utils.validText(userData.firstName, 20) == false or Utils.validText(userData.lastName, 20) == false or Utils.checkDate(userData.dob) == false or Utils.checkEmail(userData.userEmail) == false or Utils.validText(userData.userProfile, 100) == false or Utils.validText(userData.userGovId, 1000)) {
            // Trapping an error if the data is invalid
            Debug.trap("Error! Text overflow");
        };
    };

    // Function to create a new user
    public shared ({caller = user}) func createUser(userData : Types.User) : async () {
        // Getting the user's identity
        let userIdentity : Types.UserId = Principal.toText(user);

        // Checking if the user already exists or if the caller is anonymous
        if (Utils.checkKeyExist<Types.UserInfo>(userIdentity, userDataMap) == true or Principal.isAnonymous(user) == true) {
            // Trapping an error if the user already exists or the caller is anonymous
            Debug.trap("Error! You are already a user");
        };

        // Validating the user creation data
        createUserValidation(userData);

        annualRegisterFrequencyMap := Utils.updateAnnualStatus(annualRegisterFrequencyMap);

        // Creating a new user info object
        let date = Utils.getDate();
        let userInfo : Types.UserInfo = {
            firstName = userData.firstName;
            lastName = userData.lastName;
            dob = userData.dob;
            userEmail = userData.userEmail;
            userType = "guest";
            userProfile = "";
            userGovId = "";
            hostStatus = false;
            createdAt = date;
            agreementStatus = false;
            verificationStatus = false;
        };

        // Adding the user info to the user data map
        userDataMap := Trie.put(userDataMap, Utils.textKey userIdentity, Text.equal, userInfo).0;
    };

    // Function to get user info by principal
    public query func getUserInfoByPrincipal(user : Principal) : async ?Types.UserInfo {
        // Getting the user's identity
        let userIdentity = Principal.toText(user);

        // Returning the user info from the user data map
        Trie.get(userDataMap, Utils.textKey userIdentity, Text.equal);
    };

    // Function to get user info by caller
    public shared query ({caller = user}) func getUserInfo() : async ?Types.UserInfo {
        // Getting the user's identity
        let userIdentity = Principal.toText(user);

        // Retrieving the user info from the user data map
        switch (Trie.get(userDataMap, Utils.textKey userIdentity, Text.equal)) {
            case null {null};
            case (?u) {
                ?u;
            };
        };
    };

    public shared query ({caller}) func getAnnualRegisterByYear(year : Text) : async ?Types.AnnualData {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        Trie.get(annualRegisterFrequencyMap, Utils.textKey year, Text.equal);
    };
    // Function to update user info
    public shared ({caller = user}) func updateUserInfo(userData : Types.UserInfo) : async ?Types.UserInfo {
        // Getting the user's identity
        let userIdentity = Principal.toText(user);

        // Checking if the user exists or if the caller is anonymous
        if (Utils.checkKeyExist<Types.UserInfo>(userIdentity, userDataMap) == false or Principal.isAnonymous(user) == true) {
            // Trapping an error if the user doesn't exist or the caller is anonymous
            Debug.trap("No Access granted");
        };

        // Validating the user update data
        updateUserValidation(userData);

        // Creating a new user info object
        let date = Utils.getDate();
        let userInfo : Types.UserInfo = {
            agreementStatus = userData.agreementStatus;
            createdAt = date;
            dob = userData.dob;
            firstName = userData.firstName;
            hostStatus = userData.hostStatus;
            lastName = userData.lastName;
            userEmail = userData.userEmail;
            userGovId = userData.userGovId;
            userProfile = userData.userProfile;
            userType = userData.userType;
            verificationStatus = userData.verificationStatus;
        };

        // Updating the user info in the user data map
        userDataMap := Trie.put(userDataMap, Utils.textKey userIdentity, Text.equal, userInfo).0;
        ?userInfo;
    };

    // Function to check if a user exists
    public query func checkUserExist(userId : Text) : async Bool {
        // Getting the caller's identity
        // Checking if the user exists in the user data map
        Utils.checkKeyExist<Types.UserInfo>(userId, userDataMap);
    };

    public shared query func getNoOfPages(chunkSize : Nat) : async Nat {
        let allData : [(Types.UserId, Types.UserInfo)] = Trie.toArray<Types.UserId, Types.UserInfo, (Types.UserId, Types.UserInfo)>(userDataMap, func(k, v) = (k, v));

        let data = Utils.paginate<Types.UserId, Types.UserInfo>(allData, chunkSize);
        data.size();
    };

    public shared query ({caller}) func scanUsers(pageNo : Nat, chunkSize : Nat) : async [(Types.UserId, Types.UserInfo)] {
        if (Utils.getOwnerFromArray(caller, admin) == false) {
            Debug.trap("Not Authorased");
        };
        let allData : [(Types.UserId, Types.UserInfo)] = Trie.toArray<Types.UserId, Types.UserInfo, (Types.UserId, Types.UserInfo)>(userDataMap, func(k, v) = (k, v));

        let data = Utils.paginate<Types.UserId, Types.UserInfo>(allData, chunkSize);
        if (data.size() <= pageNo) {
            Debug.trap("No page Exist");
        };
        data[pageNo];
    };
    public shared query ({caller}) func whoami() : async Text {
        Principal.toText(caller);
    };
    // Function to get the owner of the canister
    public query func getOwner() : async Text {
        // Returning the owner's identity
        return Principal.toText(owner);
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
