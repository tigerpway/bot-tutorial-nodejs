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
    }else if (/(when.*practice)|(practice.*when)/i.test(request.text) || /(time.*practice)|(practice.*time)/i.test(request.text) || /(where.*practice)|(practice.*where)/i.test(request.text) || /(location.*practice)|(practice.*location)/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Practice @college ave student center 5:30pm Monday-Thursday, 4:15 Friday");
      this.res.end();
    }else if (/what.+workout/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("I can't tell you the exact workout, but here's the training plan: https://docs.google.com/spreadsheets/d/1uXZJmq_Pl_2TBoQyUTUVXFDHmbyftZglgFt0Var3ONI/edit?usp=sharing");
      this.res.end();
    }else if (/meme/i.test(request.text)){
      this.res.writeHead(200);
      switch (Math.floor((Math.random() * 3) + 1)){
        case 1:
            postMessage("https://i.groupme.com/743x592.jpeg.232923bfa9ee41cb8389b835bae2e838");
            break;
        case 2:
            postMessage("https://i.groupme.com/959x1298.jpeg.1a7a67ee72d341aebdfdff10d533200b");
            break;
        case 3:
            postMessage("https://i.groupme.com/1080x1920.png.a7de6e084ac84c6a8c2d7b1c0bcb6400");
            break;           
      }
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
