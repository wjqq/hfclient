# hfclient


This is a Hello World project to query/invoke chaincode method.

1 - Set up fabric-sample project(1.4.4) and start with command ./byfn.sh up, Before start to Instantiate the chain code, you should change the Endorsement policy to '[ -P 'OR ('\''Org1MSP.peer'\'','\''Org2MSP.peer'\'')']' it is easy to do Endorsement in step 4, if not, you need to change invoke.js to send the transactions to all the peers(peer0.Org1 and peer1.Org2), otherwise you will get endorsement Error during the transaction send.

2 - Update the variable in the Invoke.js and Query.js based on you local environment.

3 - Run the node query.js which gets the balance of Account a.

4 - Run the node invoke.js which transfers 10 from a to b

NOTE: 
You should install the right version of node and nodejs, the version you can find out in the cli container(fabric-tools)
node version is v8.16.1
npm version is 6.4.1

If you are have node with different version, you can install 'n' if you are using Ubuntu, it can help you switch the node version by 'n ${version}', it's so handy tools.


