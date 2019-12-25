'use strict';

var hfc = require('fabric-client');
var path = require('path');
var util = require('util');
var sdkUtils = require('fabric-client/lib/utils') 
const fs = require('fs');
var options = {
    user_id: 'admin', //the value is any
    msp_id: 'Org1MSP',
    channel_id: 'mychannel',
    chaincode_id: 'gy3',
    peer_url: 'grpc://localhost:17051',
    orderer_url: 'grpcs://localhost:17050',
    privateKeyFolder: 'C:/Users/WeiJia/.fabric-ca-client/msp/keystore',
    signedCert: 'C:/Users/WeiJia/.fabric-ca-client/msp/signcerts/cert.pem'
};

var channel = {};
var client = null;
var targets = [];
var tx_id = null;
const getKeyFilesInDir = (dir) =>{
    //该函数用于找到keystore目录下的私钥文件的路径 
    const files = fs.readdirSync(dir) 
    const keyFiles = [] 
    files.forEach((file_name) =>{
        let filePath = path.join(dir, file_name) 
        if (file_name.endsWith('_sk')) {
            keyFiles.push(filePath)
        }
    }) 
    return keyFiles
}
Promise.resolve().then(
    () =>{
    console.log("Load privateKey and signedCert");
    client = new hfc();
    var createUserOpt = {
        username: options.user_id,
        mspid: options.msp_id,
        cryptoContent: {
            privateKey: getKeyFilesInDir(options.privateKeyFolder)[0],
            signedCert: options.signedCert
        }
    }
	
    //以上代码指定了当前用户的私钥，证书等基本信息 
    return sdkUtils.newKeyValueStore({
        path: "C:/tmp/fabric-client-stateStore/"
    }).then((store) =>{
        client.setStateStore(store) 
        
        return client.createUser(createUserOpt)
    })
}).then((user_from_store) => {

    channel = client.newChannel(options.channel_id);
    let peer = client.newPeer(options.peer_url, {
    });
    //因为启用了TLS，所以上面的代码就是指定Peer的TLS的CA证书 
    channel.addPeer(peer);

    const request = {
        //targets : --- letting this default to the peers assigned to the channel
        chaincodeId: 'gy3',
        fcn: 'query',
        args: ['a']
      };
    
      // send the query proposal to the peer
     return channel.queryByChaincode(request);
    }
).then((query_responses) => {

    console.log('Query has completed, checking results');
    // query_responses could have more than one  results if there multiple peers were used as targets
    if (query_responses && query_responses.length == 1) {
      if (query_responses[0] instanceof Error) {
        console.error('error from query = ', query_responses[0]);
      } else {
        console.log('Response is ', query_responses[0].toString());
      }
    } else {
      console.log('No payloads were returned from query');
    }
});