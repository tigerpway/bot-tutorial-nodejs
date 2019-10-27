var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

//Regex 1
function respond() {
      var request = JSON.parse(this.req.chunks[0]);  

  if(request.text) {
    if (/injur/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("Run harder.");
    this.res.end();
    }else if (/hurt/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Run more.");
      this.res.end();
    }else if (/can i.+?/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("I don't know. Can you run a sub 30 8k?");
      this.res.end();
    }else if (/i have class/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("When I was at Rutgers, I pulled a 4.0 while running for the team. I scheduled my classes around practice. If I can do that while majoring in English, why can't you with your double major in engineering and medicine, 3 part time jobs, and infant twins?");
      this.res.end();
    }else if (/hi chuck!/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("You still run?");
      this.res.end();
    }else if (/hi @chuckbot!/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Hi, I'm Chuckbot, your unfriendly and overdemanding virtual coach. Like my creator, I'm not too bright. And like my real-life counterpart, I tend to say the wrong things at the most inopportune times.");
      this.res.end();
    }else if (/when.+practice/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Practice @college ave student center 5:30pm Monday-Thursday, 4:15 Friday");
      this.res.end();
    }else if (/@chuckbot, what's the workout today?/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("I'm not not smart enough to tell you the exact workout, but here's the training plan: https://docs.google.com/spreadsheets/d/1uXZJmq_Pl_2TBoQyUTUVXFDHmbyftZglgFt0Var3ONI/edit?usp=sharing");
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
