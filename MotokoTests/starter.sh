echo "stopping canister"
echo "---------Stoping dfx----------"
dfx stop
echo "---------Starting dfx----------"
dfx start --clean --background
echo "---------Deploying Backend Canister----------"
dfx deploy
echo "---------Deployed all canisters----------"