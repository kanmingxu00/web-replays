var {ParseClient} = require('../../protos/parse_grpc_web_pb.js')
var {MatchRequest, ParsedResponse} = require('../../protos/parse_pb.js');

const params = {
    address: "http://localhost:8080",
    defaultName: "world"
}

const readyMessage = (/* Stream */) => {
    while (true) {
        // returns when you get ready message
    }
}

const run = (/* */) => {
    while (true) {
        // keep reading
    }
};

let beegarray = [];

function sizeOf(obj) {
    let bytes = 0;
    if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
            case 'number':
                bytes += 8;
                break;
            case 'string':
                bytes += obj.length * 2;
                break;
            case 'boolean':
                bytes += 4;
                break;
            case 'object':
                if (obj.array) {
                    for (let i = 0; i < obj.array.length; i++) {
                        bytes += sizeOf(obj.array[i]);
                        bytes += 8;
                    }
                }
                break;
            default:
                console.log("unknown object:");
                console.log(obj);
        }
    }
    return bytes;
}

function formatByteSize(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
    else return (bytes / 1073741824).toFixed(3) + " GiB";
}


export async function SendTest(matchID, addFileData, allDataReceived) {


    const parseClient = new ParseClient(params.address, {}, {});
    const request = new MatchRequest();
    const d = new Date();
    const clientID = d.getTime();
    request.setClientid(clientID);
    request.setMatchid(matchID);

    console.log("Sending request: ");
    console.log(request);


    let bytes = 0;
    let count = 0;
    let amt = 0;

    // i had to dig through code for this: (trust me on it)
    // https://github.com/grpc/grpc-web/blob/master/javascript/net/grpc/web/grpcwebclientreadablestream.js
    const hard = parseClient.createStream(request, {}); // returns a grpcwebclientreadablestream
    const readyPromise = new Promise(function (resolve, reject) {
        hard.on('data', function (parsedReponse) {
            bytes += sizeOf(parsedReponse);
            // if(!beegarray[parsedReponse.getTick()]){
            //     beegarray[parsedReponse.getTick()] = [];
            // }

            // if (parsedReponse.getHero()) {
            //     beegarray[parsedReponse.getTick()].push(parsedReponse.getHero()); //this is shit retard
            // }
            addFileData(parsedReponse.getTick(), parsedReponse.getHero());

            if (count % 1000 === 0 && amt < 10) {
                console.log(typeof parsedReponse);
                console.log(parsedReponse);
                console.log(bytes);
                count = 0;
                amt++
            }
            count++;
            if (parsedReponse.getReady()) {
                if(amt<5) {
                    console.log("ready buf received");
                    resolve();
                }
                else {
                    console.log("done receiving");
                    console.log(formatByteSize(bytes))
                    console.log(beegarray);
                }
            }
        });
        hard.on('end', function (end) {
            hard.cancel()
            console.log("i'm here now")
        });
    });


    await readyPromise.then(function () {
        parseClient.parse(request, {}, function (err, response) {
            if (err != null) {
                console.log("uh oh! error in parse method");
                console.log(err)
            } else {
                console.log("done");
                console.log(err);
                console.log(response)
                //resolve
                allDataReceived();
            }
        })
    });

    console.log(formatByteSize(bytes));


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








