# canisters
userCanister="User"
supportCanister="supportChat"

# user variables
userCanister="User"
name="user1"
email="u@gmail.com"
date="12/11/2012"
samplestr="sdksd,xl,x"
principal=$(dfx identity get-principal)

# support chat variables
issue="supportChatMessage"
resolveResponse="IResolvedYourIssue"

# ticket raising variables
reason="reason"
adminMessage="messageForAdmin"
hostMessage="messageForHost"
pageNumber=0
entriesNeeded=8
chunksize=10
year="2024"
ticket_id=$(dfx canister call $supportCanister scanBooking '('${pageNumber}','${entriesNeeded}')'| grep -o '"[^"]*"'| awk 'NR==2')
user_id=$(dfx canister call $supportCanister scanBooking '('${pageNumber}','${entriesNeeded}')'| grep -o '"[^"]*"'| awk 'NR==1')

echo "-------------Creating a new user for testing--------------"
dfx canister call $userCanister createUser '(record {
        firstName="'${name}'"; 
        lastName="'${name}'";
        dob="'${date}'";
        userEmail = "'${email}'";
    })'

echo "---------------Adding an admin----------------"
dfx canister call $supportCanister addOwner '("'${principal}'")'

echo "----------------Getting all admins----------------"
dfx canister call $supportCanister getAllAdmin 

echo "-------------Reporting issue in support chat---------------"
dfx canister call $supportCanister createIssue '("'${issue}'")'

echo "-------------Getting all user issues-----------------"
dfx canister call $supportCanister getAllUserIssue 

echo "--------------Getting all unresolved issues------------------"
dfx canister call $supportCanister getAllUnResolvedIssue

echo "-----------------Resolving user issues-----------------------"
dfx canister call $supportCanister resolveUserIssue '("'${principal}'","'${resolveResponse}'")'

echo "-----------Getting all resolved issues-----------"
dfx canister call $supportCanister getResolvedIssue 

echo "----------------Raising new ticket-------------------"
dfx canister call $supportCanister raiseNewTicket '(
        "'${reason}'", 
        "'${hostMessage}'", 
        "'${adminMessage}'", 
        record {
            region="'${samplestr}'"; 
            country="'${samplestr}'"; 
            city="'${samplestr}'"; 
            postalCode="'${samplestr}'"; 
            building="'${samplestr}'"; 
            streetAddress="'${samplestr}'"
        }
    )'

echo "------------------Getting all tickets raised--------------------"
dfx canister call $supportCanister getTicket

echo "-----------------------Getting tickets raised by a particular user------------------------"
dfx canister call $supportCanister getUserTicketsByAdmin '("'${principal}'")'

echo "--------------------Checking if user is an admin or not-----------------------"
dfx canister call $supportCanister isAdmin

echo "----------------Getting number of pages based on chunk size----------------"
dfx canister call $supportCanister getNoOfPages '('${chunksize}')'

echo "-----------------Getting all the tickets by scanning tickets by page number-----------------"
dfx canister call $supportCanister scanBooking '('${pageNumber}','${entriesNeeded}')'

echo "----------------Resolving a ticket--------------------"
dfx canister call $supportCanister resolveTicketRaised '('${ticket_id}','${user_id}')'

echo "-----------------Getting all the tickets after resolution-----------------"
dfx canister call $supportCanister scanBooking '('${pageNumber}','${entriesNeeded}')'

echo "--------------------Deleting resolved ticket------------------------"
dfx canister call $supportCanister removeResolvedTicketRaised '('${ticket_id}','${user_id}')'

echo "-----------------Getting all the tickets after deletion-----------------"
dfx canister call $supportCanister scanBooking '('${pageNumber}','${entriesNeeded}')'

echo "--------------Calling whoami---------------"
dfx canister call $supportCanister whoami