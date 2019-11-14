var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

//Regex 1
function respond() {
      var request = JSON.parse(this.req.chunks[0]);  

  if(request.text) {
    if (/van/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("Please upload a copy of your defensive driving form- Guillermo");
    this.res.end();
    }else if (/rec/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("Attention! Your Driver License will expire in 30 days, which will affect your Club membership’s status. Please re-submit a new valid document.");
    this.res.end();
    }else if (/cold/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("GoOd AfTeRnOoN, \n \n DuE tO ThE uEeXpEcTeD dRoP iN tEmPeRaTuRe tHiS eVeNiNg We ArE cAnCeLlInG aLl OuTdOoR pRaCtIcEs tHiS EvEnInG. \n \n BeSt \n \n Mr. PapPaS");
    this.res.end();
    }
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

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
