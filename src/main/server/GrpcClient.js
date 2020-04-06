var { ParseClient } = require('../../protos/parse_grpc_web_pb.js')
var { MatchRequest, MatchResponse } = require('../../protos/parse_pb.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

params = {
    address: "localhost:8080",
    defaultName: "world"
}

const readyMessage = (/* Stream */) => {
    while(true) {
        // returns when you get ready message
    }
}

const run = (/* */) => {
    while(true) {
        // keep reading
    }
}

var func = async function(matchID) {
    

    const parseClient = new ParseClient(params.address);
    const request = new MatchRequest();
    const d = new Date();
    const clientID = d.getTime();
    request.setClientid(clientID);
    request.setMatchid(matchID);

    console.log("watashi")

    // i had to dig through code for this: (trust me on it)
    // https://github.com/grpc/grpc-web/blob/master/javascript/net/grpc/web/grpcwebclientreadablestream.js
    const gay = parseClient.createStream(request, {}); // returns a grpcwebclientreadablestream
    console.log(gay)

    // const stream = 

    // stream = some stream
    // const promise = new Promise((/* Stream */) => {
    //     while(true) {
    //         // returns when you get ready message
    //     }
    // // }) 
    // await readyMessage(/* Stream */)
    // run(/* Stream */)

}

func()








