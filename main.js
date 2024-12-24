const fs = require('fs');
const request = require('request');

const REST_HOST = 'localhost:8080'
const MACAROON_PATH = 'admin.macaroon pathを入れる'

const  lipa = (Buffer.from('02ba3ad33666de22b4c22f5ff9fac0dc5d18ae9b6ce38c0a06d9e171494c39255a','hex')).toString('base64')
// const  boat = (Buffer.from('02103f1826be6287c8430e653de06ef16d94b3106c01937a78f5ae2c89bd40f234','hex')).toString('base64')
const  henwen = (Buffer.from('02f0c7b731ca40a285d7c12aa1c5c7c7caa4598d3d6d34904c3714cd0d47852640','hex')).toString('base64')
const  elenpay = (Buffer.from('02c5544a361bfe1f025f29e83d092e4c83feaf5f750af59a0b1ff0591ebc0beedc','hex')).toString('base64')
const  fiypdev = (Buffer.from('021744d86987a91958461117cd9e7c0e3160f7b86de11f5998018f4b4984a5c330','hex')).toString('base64')

let requestBody = {
    channels: [
        {
//            local_funding_amount: '2200000',
//            node_pubkey: DiamondHands
//          },{
            local_funding_amount: '5500000',
            node_pubkey: lipa
          },{
            local_funding_amount: '5500000',
            node_pubkey: henwen
          },{
            local_funding_amount: '5500000',
            node_pubkey: elenpay
          },{
            local_funding_amount: '5500000',
            node_pubkey: fiypdev
          }
    ], // <BatchOpenChannel> 
    sat_per_vbyte: '5', // <int64> 
    // target_conf: 1
  };


let options = {
  url: `https://${REST_HOST}/v1/channels/batch`,
  // Work-around for self-signed certificates.
  rejectUnauthorized: false,
  json: true,
  headers: {
    'Grpc-Metadata-macaroon': fs.readFileSync(MACAROON_PATH).toString('hex'),
  },
  form: JSON.stringify(requestBody),
}
request.post(options, function(error, response, body) {
  console.log(body);
});
// Console output:
//  {
//    "pending_channels": <array>, // <PendingUpdate> 
//  }