userCanister="User"
name="user1"
email="u@gmail.com"
date="12/11/2012"
samplestr="sdksd,xl,x"
principal=$(dfx identity get-principal)
pageNumber=0
entriesNeeded=8
chunksize=10
year="2024"


echo "---------Creating new user----------"
dfx canister call $userCanister createUser '(record {
        firstName="'${name}'"; 
        lastName="'${name}'";
        dob="'${date}'";
        userEmail = "'${email}'";
    })'

echo "---------Getting details of the user created----------"
dfx canister call $userCanister getUserInfo


echo "---------Updating the user's name----------"
dfx canister call $userCanister updateUserInfo '(record {
        firstName="'${name}'"; 
        lastName="'${name}'";
        dob="'${date}'";
        userEmail = "'${email}'";
        userType="'${samplestr}'";
        userProfile="'${samplestr}'";
        userGovId= "'${samplestr}'"; 
        hostStatus= false; 
        verificationStatus= true;
        agreementStatus=true;
        createdAt="'${date}'"
    })'


echo "---------Getting user details after updation----------"
dfx canister call $userCanister getUserInfo

echo "---------Getting user details by principal----------"
dfx canister call $userCanister getUserInfoByPrincipal '(principal"'${principal}'")'

echo "------------Adding new owner-------------"
dfx canister call $userCanister addOwner '("'${principal}'")'

echo "---------Getting number of users registered by year---------"
dfx canister call $userCanister getAnnualRegisterByYear '("'${year}'")'

echo "---------Getting number of pages for a chunksize-----------"
dfx canister call $userCanister getNoOfPages '('${chunksize}')'

echo "---------Getting all the users by scan users for a page---------"
dfx canister call $userCanister scanUsers '('${pageNumber}','${entriesNeeded}')'

echo "----------calling whoami-----------"
dfx canister call $userCanister whoami
