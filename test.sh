echo "stopping canister"
echo "---------Stoping dfx----------"
dfx stop
echo "---------Starting dfx----------"
dfx start --clean --background
echo "---------Deploying Backend Canister----------"
dfx deploy backend
userCanister=$(dfx canister call backend createNewUserCanister userCanister | grep -oP '(?<=\")(.*?)(?=\")')
hotelCanister=$(dfx canister call backend createNewHotelCanister hotelCanister | grep -oP '(?<=\")(.*?)(?=\")')
echo "---------Accessing user Canister and creating account of the user, using principal of idenitity in terminal----------"
dfx canister call $userCanister createUser '("Rahul","Sharma","18-sep-2003","rahul@gmail.com","user")'
echo "---------Accessing user Canister and executing getPK function and returns canister name, using principal of idenitity in terminal----------"
dfx canister call $userCanister getPK
echo "---------Accessing user Canister and executing updateUserInfo and returns canister name, using principal of idenitity in terminal----------"
dfx canister call $userCanister updateUserInfo '(record {firstName="Anas"; lastName="chung";dob="12/09/2004";userEmail = "anas@gmail.com";userType="user";userProfile="random"; userGovId= "sddffdf"; hostStatus= false; verificationStatus= true;})'
echo "---------Accessing user Canister and  getOwner the idenitity  of owner in terminal----------"
dfx canister call $userCanister getOwner
echo "---------Accessing Hotel canister and  register the hotel with hotel id of user  in terminal----------"
userUuid=$(dfx canister call $hotelCanister createHotel '(record {hotelTitle= "venture";hotelDes="Huge rooms";hotelImage="djnjvnjvnfd";hotelPrice="$2000";hotelLocation="Ludhiana"})'| grep -oP 'rzo6e-othar-as4dz-5dm3l-5mlxo-q7w3x-5ol3f-74pvr-s2mbw-vdigk-yae#[0-9a-f\-]+')
echo "---------Accessing hotel Canister and inserting Hotel Id HotelIds linked with userId, using principal of idenitity in terminal----------"
dfx canister call $hotelCanister getHotelId $userUuid
