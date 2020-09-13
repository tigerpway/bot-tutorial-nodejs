var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

//Regex 1
// function respond() {
//       var request = JSON.parse(this.req.chunks[0]);  

//   if(request.text) {
//     if (/lx/i.test(request.text)){
//     this.res.writeHead(200);
//     postMessage("PLEASE STAND BEHIND THE WHITE LINE WHILE THE BUS IS IN MOTION");
//     this.res.end();
//     }else if (/goodnight/i.test(request.text)){
//       this.res.writeHead(200);
//       postMessage("THIS BUS IS NOW OUT OF SERVICE");
//       this.res.end();
//     }else if (/pleasestop/i.test(request.text)){
//       this.res.writeHead(200);
//       postMessage("YOU SUCK! YOU DON'T CONTROL ME!");
//       this.res.end();
//     }else if (/stop/i.test(request.text)){
//       this.res.writeHead(200);
//       postMessage("S​TOP REQUESTED");
//       this.res.end();
//     }
//   } else {
//     console.log("don't care");
//     this.res.writeHead(200);
//     this.res.end();
//   }
// }

function postMessage(botResponse) {
  var options, body, botReq;
          
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
