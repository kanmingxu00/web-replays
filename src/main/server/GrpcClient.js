var { ParseClient } = require('../../protos/parse_grpc_web_pb.js')
var { MatchRequest, ParsedResponse } = require('../../protos/parse_pb.js');

const params = {
    address: "http://localhost:8080",
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
};

export async function SendTest(matchID) {
    

    const parseClient = new ParseClient(params.address, {}, {});
    const request = new MatchRequest();
    const d = new Date();
    const clientID = d.getTime();
    request.setClientid(clientID);
    request.setMatchid(matchID);

    console.log("Sending request: ");
    console.log(request)



    // i had to dig through code for this: (trust me on it)
    // https://github.com/grpc/grpc-web/blob/master/javascript/net/grpc/web/grpcwebclientreadablestream.js
    const hard = parseClient.createStream(request, {}); // returns a grpcwebclientreadablestream
    const readyPromise = new Promise(function (resolve, reject) {
        hard.on('data', function (parsedReponse) {
            console.log(parsedReponse);
            if (parsedReponse.getReady()) {
                console.log("ready buf received");
                resolve();
            }
        });
    });

    await readyPromise.then(function () {
        parseClient.parse(request, {}, function (err, response) {
            if (err != null) {
                console.log("uh oh! error in parse method");
                console.log(err)
            } else {
                console.log(err);
                console.log(response)
            }
        })
    })


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








