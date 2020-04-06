import { ParseClient } from '../../protos/parse_grpc_web_pb.js';
import { MatchRequest, MatchResponse } from '../../protos/parse_pb.js';

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

export default async function(matchID) {
    const parseClient = new ParseClient(address)
    const request = new MatchRequest()
    const d = new Date();
    const clientID = d.getTime();
    request.setClientid(clientID);
    request.setMatchid(matchID);

    parseClient.createStream(request)

    // stream = some stream
    // const promise = new Promise((/* Stream */) => {
    //     while(true) {
    //         // returns when you get ready message
    //     }
    // }) 
    await readyMessage(/* Stream */)
    run(/* Stream */)

}








