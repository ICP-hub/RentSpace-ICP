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
dfx canister call $userCanister createUser '(record {firstName="Mohammad "; lastName="Anas";dob="18/09/2003";userEmail = "mohdanaspctebca@0@gmail.com";})'
echo "---------Accessing user Canister and executing getPK function and returns canister name, using principal of idenitity in terminal----------"
dfx canister call $userCanister getUserInfo
echo "---------Accessing user Canister and executing updateUserInfo and returns canister name, using principal of idenitity in terminal----------"
dfx canister call $userCanister updateUserInfo '(record {firstName="Mohammad "; lastName="Anas";dob="18/09/2003";userEmail = "mohdanaspctebca@0@gmail.com";userType="user";userProfile="random"; userGovId= "sddffdf"; hostStatus= false; verificationStatus= true;})'
echo "---------Accessing user Canister and  getOwner the idenitity  of owner in terminal----------"
dfx canister call $userCanister getOwner
echo "---------Accessing Hotel canister and  register the hotel with hotel id of user  in terminal----------"
dfx canister call $hotelCanister createHotel '(record {hotelTitle= "venture";hotelDes="Huge rooms";hotelImage="djnjvnjvnfd";hotelPrice="$2000";hotelLocation="Ludhiana"})'
echo "---------Accessing hotel Canister and inserting Hotel Id HotelIds linked with userId, using principal of idenitity in terminal----------"
hotelUuid=$(dfx canister call $hotelCanister getHotelId | grep -o '"[^"]*"' | awk 'NR==1')
echo $hotelUuid
echo "---------Accessing hotel Canister and inserting Hotel Id HotelIds linked with userId, using principal of idenitity in terminal----------"
dfx canister call $hotelCanister getHotel "(""$hotelUuid"")"
echo "---------Accessing hotel Canister and updateinng  Hotel Id HotelIds , using principal of idenitity in terminal----------"
dfx canister call $hotelCanister updateHotel "("$hotelUuid",record {hotelTitle= 'Indane';hotelDes='Comfyrooms';hotelImage='djnjdseed';hotelPrice='120000';hotelLocation='London'})"
