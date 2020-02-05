var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var botSenderID = process.env.SENDER_ID;

function respond() {
      var request = JSON.parse(this.req.chunks[0]);
      
      //console.log(JSON.stringify(request)); // See request
      
      if (request.sender_id == botSenderID) {
            return; // ignore the bot's own messages
      }
      
  if(request.text) {
    if (/injur/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("Run harder.");
    this.res.end();
    }else if (/hurt/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Run more.");
      this.res.end();
    }else if (/why do you want to be president/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Because a democracy is not a democracy if only one person is running. It's a matter of principle.");
      this.res.end();
    }else if (/can i.+\?/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("I don't know. Can you run a sub 30 8k?");
      this.res.end();
    }else if (/i have class/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("When I was at Rutgers, I pulled a 4.0 while running for the team. I scheduled my classes around practice. If I can do that while majoring in English, why can't you with your double major in engineering and medicine, 3 part time jobs, and infant quadruplets?");
      this.res.end();
    }else if (/hi chuck!/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("You still run?");
      this.res.end();
    }else if (/chuck, what is your 800 time/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Faster than yours.");
      this.res.end();
    }else if (/hi @chuckbot!/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Hi, I'm Chuckbot, the inferior digital version of the club coach. I can answer basic questions about when and where we meet to run. I'm always being improved!");
      this.res.end();
    }else if (/(is.*practic.*today)|(is.*running.*today)|(are.*running.*today)|(is.*practic.*afternoon)|(is.*running.*afternoon)|(are.*running.*afternoon)/i.test(request.text) || /(when.*practice)|(practice.*when)/i.test(request.text) || /(time.*practice)|(practice.*time)/i.test(request.text) || /(where.*practice)|(practice.*where)/i.test(request.text) || /(location.*practice)|(practice.*location)/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Practice @ College Ave Student Center \n Monday-Thursday: 5:30pm \n Friday: 4:15pm");
      this.res.end();
    }else if (/what.*workout/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("I can't tell you the exact workout, but here's the training plan: https://docs.google.com/spreadsheets/d/1uXZJmq_Pl_2TBoQyUTUVXFDHmbyftZglgFt0Var3ONI/edit?usp=sharing");
      this.res.end();
    }else if (/(i'm.*late)|(on my way)|(omw)/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Hurry up!");
      this.res.end();
    }else if (/http.*form/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Have the decency to show up to practice before sending Google Forms.");
      this.res.end();
    }else if (/(morning.*run)|(run.*morning)|(morning.*practice)|(practice.*morning)/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("Can't make it to normal prac\0tice? Join the morning ru\0n GroupMe here: https://web.groupme.com/join_group/48161094/2iDQt4Xi");
      this.res.end();
    }else if (/meme/i.test(request.text)){
      this.res.writeHead(200);
      switch (Math.floor((Math.random() * 7) + 1)){
        case 1:
            postMessage("https://i.groupme.com/743x592.jpeg.232923bfa9ee41cb8389b835bae2e838");
            break;
        case 2:
            postMessage("https://i.groupme.com/959x1298.jpeg.1a7a67ee72d341aebdfdff10d533200b");
            break;
        case 3:
            postMessage("https://i.groupme.com/1080x1920.png.a7de6e084ac84c6a8c2d7b1c0bcb6400");
            break;
        case 4:
            postMessage("https://i.groupme.com/627x696.jpeg.f29e2196594c4279bcb512923a9174cd");
            break;
        case 5:
            postMessage("https://i.groupme.com/960x960.jpeg.cc7bd07897e54186b8b4f26c294c63d5");
            break;
        case 6:
            postMessage("https://i.groupme.com/720x960.jpeg.8f9a90f15e4d408a91d24d7639c979c0");
            break;
       case 7:
            postMessage("https://i.groupme.com/2048x1360.jpeg.3323591754b7429390e270ebbc17fb64");
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
