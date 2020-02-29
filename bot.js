var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

//Regex 1
function respond() {
      var request = JSON.parse(this.req.chunks[0]);  

      if (/o lx on busch, what is thou wisdom?/i.test(request.text)){
      this.res.writeHead(200);
      switch (Math.floor((Math.random() * 7) + 1)){
        case 1:
            postMessage("If you're already going to be late, take a 15 minute break.");
            break;
        case 2:
            postMessage("If early is on time, on time is late, and late is unacceptable, therefore by the transitive property, early is unacceptable. So you might as well be late.");
            break;
        case 3:
            postMessage("You miss 100% of the shots you don't take. - Lee Harvey Oswald");
            break;
        case 4:
            postMessage("Don't give up on your dreams. Keep sleeping.");
            break;
        case 5:
            postMessage("Sometimes violence is the answer.");
            break;
        case 6:
            postMessage("If you're ever feeling bad for someone else, look in a mirror. They could have it a lot worse. They could be you.");
            break;
       case 7:
            postMessage("Remember that everyone is unique. Which makes us exactly the same.");
            break;                  
      }this.res.end();
    }else if(request.text) {
    if (/lx/i.test(request.text)){
    this.res.writeHead(200);
    postMessage("PLEASE STAND BEHIND THE WHITE LINE WHILE THE BUS IS IN MOTION");
    this.res.end();
    }else if (/goodnight/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("THIS BUS IS NOW OUT OF SERVICE");
      this.res.end();
    }else if (/pleasestop/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("YOU SUCK! YOU DON'T CONTROL ME!");
      this.res.end();
    }else if (/stop/i.test(request.text)){
      this.res.writeHead(200);
      postMessage("S​TOP REQUESTED");
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
