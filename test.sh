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
dfx canister call $userCanister createUser ("Rahul","Sharma", "18-sep-2003","rahul@gmail.com","user")
echo "---------Accessing user Canister and executing getPK function and returns canister name, using principal of idenitity in terminal----------"
dfx canister call $userCanister getPK
echo "---------Accessing user Canister and executing getPK function and returns canister name, using principal of idenitity in terminal----------"


echo "---------Accessing hotel Canister and creating account of the user, using principal of idenitity in terminal----------"
dfx canister call $hotelCanister createHotel
echo "---------Accessing hotel Canister and creating account of the user, using principal of idenitity in terminal----------"
