userCanister="User"
hotelCanister="Hotel"
reviewCanister="Review"


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
echo "$hotelId"


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

echo "-------------------Creating new Review-------------------"

dfx canister call $reviewCanister createReview '('${hotelID}', record {
    hotelId='${hotelID}';
    rating=4.0;
    title="This is a review";
    des="This is a review description";
})'

echo "-------------------Getting all Reviews-------------------"

dfx canister call $reviewCanister getAllReviewsOnHotel '('${hotelID}')'

echo "--------------Getting Hotel Rating---------------"
dfx canister call $reviewCanister getHotelRating '('${hotelID}')'

echo "--------------Calling Who Am I---------------"

dfx canister call $reviewCanister whoami