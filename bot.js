var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var lx = "PLEASE STAND BEHIND THE WHITE LINE WHILE THE BUS IS IN MOTION";
var gn = "THIS BUS IS NOW OUT OF SERVICE";
var stop = "STOP REQUESTED";
var pleaseStop = "YOU SUCK! YOU DON'T CONTROL ME!";

var botID = process.env.BOT_ID;

function respond() {
      var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\lx$/ || botRegex = /^\goodnight$/ || botRegex = /^\stoplx$/ || botRegex = /^\pleasestop$/;

  if(request.text && botRegex.test(request.text)) {
    var input = request.text;   
    this.res.writeHead(200);
    postMessage(input);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(input) {
  var botResponse, options, body, botReq;

  if (input="lx"){
      botResponse = lx;
  }else if (input="goodnight"){
      botResponse = gn;
  }else if (input="stoplx"){
      botResponse = stop;
  }else if (input="pleasestop"){
      botResponse = pleaseStop;
  }    

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
