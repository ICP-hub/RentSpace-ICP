# canisters
userCanister="User"
hotelCanister="Hotel"
commentCanister="Comment"


# user variables
name="user1"
email="u@gmail.com"
date="12/11/2012"
samplestr="sdksd,xl,x"
principal=$(dfx identity get-principal)

# hotel variables
hname="hotel1"
des="sdnjndwndwdnimwidnwindWdiwndiwndiwd"
price=300
location="haryana"
image="img1"
hdate="12/11/2012"
hotelId=""

# Room variables
roomType="Single"
roomPrice=300

#comment variables
echo "$hotelId"
comment_id=$(dfx canister call $commentCanister getComments '('${hotelId}')'| grep -o '"[^"]*"' | awk 'NR==1')
pageNumber=0
entriesNeeded=8
comment="ThisIsAComment"


echo "---------------Creating new user for testing---------------"
dfx canister call $userCanister registerUser '(record {
         firstName="'${name}'"; 
         lastName="'${name}'";
         dob="'${date}'";
         userEmail = "'${email}'";
     })'

echo "------------------Creating new hotel for testing---------------------"
hotelID=$(dfx canister call $hotelCanister createHotel '(record {
         hotelId= "'${hotelId}'";
         hotelTitle= "'${hname}'";
         hotelDes="'${des}'";
         hotelImage="'${image}'";
         hotelLocation="'${location}'";
         hotelAvailableFrom="'${hdate}'";
         hotelAvailableTill="'${hdate}'";
         createdAt="'${hdate}'"
    },
    record {
        roomType="'${roomType}'";
        roomPrice='${roomPrice}';
    }
    )'| grep -o '"[^"]*"' | awk 'NR==1')
echo "'${hotelID}'"

echo "-------------------Creating new comment-------------------"
dfx canister call $commentCanister createComment '('${hotelID}',record {
    message="'${comment}'";
    parentCommentId="";
})'
echo "-----------------Getting all the comment on a hotel--------------------"
dfx canister call $commentCanister getComments '('${hotelID}')'
echo "--------------Calling whoami---------------"
dfx canister call $commentCanister whoami