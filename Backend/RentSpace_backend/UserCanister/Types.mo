module {
    public type UserId = Text;
    public type User = {
        firstName : Text;
        lastName : Text;
        dob : Text;
        userEmail : Text;
    };
    public type UserInfo = {
        firstName : Text;
        lastName : Text;
        dob : Text;
        userEmail : Text;
        userType : Text;
        userProfile : Text;
        userGovId : Text;
        hostStatus : Bool;
        verificationStatus : Bool;
        createdAt : Text;
        agreementStatus : Bool;
    };
};
