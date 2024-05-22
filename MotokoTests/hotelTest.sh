# canister names
userCanister="User"
hotelCanister="hotel"

# user variables
name="user1"
email="u@gmail.com"
date="12/11/2012"
samplestr="sdksd,xl,x"
principal=$(dfx identity get-principal)

# hotel variables
hname="hotel1"
changedHname="hotel2"
des="sdnjndwndwdnimwidnwindWdiwndiwndiwd"
price="300"
location="haryana"
image="img1"
hdate="12/11/2012"
hotelId=$(dfx canister call $hotelCanister getHotelId | grep -o '"[^"]*"' | awk 'NR==1')
pageNumber=0
entriesNeeded=8
chunksize=10
year="2024"

echo "---------Creating new user for hotel----------"
dfx canister call $userCanister createUser '(record {
        firstName="'${name}'"; 
        lastName="'${name}'";
        dob="'${date}'";
        userEmail = "'${email}'";
    })'
echo "-------------Creating new hotel----------------"
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


echo "---------Getting hotels listed by a user----------"
dfx canister call $hotelCanister getHotelId

echo "-------------Getting a particular hotel's details : $hotelId----------------"
dfx canister call $hotelCanister getHotel '('${hotelId}')'

echo "--------------Update hotel---------------"
dfx canister call $hotelCanister updateHotel '(
    '${hotelId}',
    record {
        hotelTitle= "'${changedHname}'";
        hotelDes="'${des}'";
        hotelImage="'${image}'";
        hotelPrice="'${price}'";
        hotelLocation="'${location}'";
        hotelAvailableFrom="'${hdate}'";
        hotelAvailableTill="'${hdate}'";
        createdAt="'${hdate}'";
    }
)'

echo "-------------Getting hotel's details after updation----------------"
dfx canister call $hotelCanister getHotel '('${hotelId}')'

echo "-----------------Deleting hotel----------------"
dfx canister call $hotelCanister deleteHotel '('${hotelId}')'

echo "-------------Getting hotel's details after deletion----------------"
dfx canister call $hotelCanister getHotel '('${hotelId}')'

echo "-------------Adding new admin------------"
dfx canister call $hotelCanister addOwner '("'${principal}'")'

echo "------------Get all admins--------------"
dfx canister call $hotelCanister getAllAdmin

echo "-------------Getting hotel availability--------------"
dfx canister call $hotelCanister getHotelAvailabilty '('${hotelId}')'

echo "--------------Getting yearly frequency of hotels registered---------------"
dfx canister call $hotelCanister getHotelFrequencyByYear '("'${year}'")'

echo "----------------Getting number of pages for a chunksize-------------------"
dfx canister call $hotelCanister getNoOfPages '('${chunksize}')'

echo "----------------Getting all the users by scan users for a page----------------"
dfx canister call $hotelCanister scanHotel '('${pageNumber}','${entriesNeeded}')'
