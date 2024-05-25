#canisters
userCanister="User"
hotelCanister="hotel"
commentCanister="comment"

# user variables
name="user1"
email="u@gmail.com"
date="12/11/2012"
samplestr="sdksd,xl,x"
principal=$(dfx identity get-principal)

# hotel variables
hname="hotel1"
des="sdnjndwndwdnimwidnwindWdiwndiwndiwd"
price="300"
location="haryana"
image="img1"
hdate="12/11/2012"
hotelId=$(dfx canister call $hotelCanister getHotelId | grep -o '"[^"]*"' | awk 'NR==1')

#comment variables
echo "$hotelId"
comment_id=$(dfx canister call $commentCanister getComments '('${hotelId}')'| grep -o '"[^"]*"' | awk 'NR==1')
pageNumber=0
entriesNeeded=8
comment="ThisIsAComment"


echo "---------------Creating new user for testing---------------"
dfx canister call $userCanister createUser '(record {
        firstName="'${name}'"; 
        lastName="'${name}'";
        dob="'${date}'";
        userEmail = "'${email}'";
    })'

echo "------------------Creating new hotel for testing---------------------"
dfx canister call $hotelCanister createHotel '(record {
        hotelTitle= "'${hname}'";
        hotelDes="'${des}'";
        hotelImage="'${image}'";
        hotelPrice="'${price}'";
        hotelLocation="'${location}'";
        hotelAvailableFrom="'${hdate}'";
        hotelAvailableTill="'${hdate}'";
        createdAt="'${hdate}'"
    })'

echo "-------------------Creating new comment-------------------"
dfx canister call $commentCanister createComment '('${hotelId}',"","'${comment}'")'

echo "-----------------Getting all the comment on a hotel--------------------"
dfx canister call $commentCanister getComments '('${hotelId}')'

echo "---------------Getting details of a comment----------------"
dfx canister call $commentCanister getSingleComments '("'${comment_id}'")'

echo "--------------Adding new admin-----------------"
dfx canister call $commentCanister addOwner '("'${principal}'")'

echo "----------------Getting all Admins---------------"
dfx canister call $commentCanister getAllAdmin

echo "--------------------Getting all the comments by scan comments for a page number-----------------------"
dfx canister call $commentCanister scanComment '('${pageNumber}','${entriesNeeded}')'

echo "--------------Calling whoami---------------"
dfx canister call $commentCanister whoami