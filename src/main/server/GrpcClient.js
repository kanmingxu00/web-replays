import {ParseClient} from '../../protos/parse_grpc_web_pb.js';
import {MatchRequest, MatchResponse} from '../../protos/parse_pb.js';
import Date

params = {
    address: "localhost:8080",
    defaultName: "world"
}

let parseClient = new ParseClient(address)

const log = (word) => {
    console.log(word)
}

function main() {

}