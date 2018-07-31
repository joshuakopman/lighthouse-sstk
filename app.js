var express = require('express');
var app = express();
var path = require('path');
var ws = require('ws')
var lighthouseLauncher = require('./lighthouseLauncher');
var currentAverage = 0;
var noOfRuns = 1;
const PORT = process.env.PORT || 8000;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000);

const wss = new SocketServer({ app });
  wss.on('connection', function (ws) {
  	ws.on('message', function (message) {
    	console.log('received: %s', message)
  	})
	setInterval(function(){
 	 new lighthouseLauncher().launchChromeAndRunLighthouse('https://www.shutterstock.com', {chromeFlags: ['--headless']}).then(results => {
     setTimeout(() => {
      if (results.categories.performance.score) {
        const currentScore = results.categories.performance.score * 100;
        if (currentScore >= 100) {
            console.info(`Performance score is 100.`);
            process.exit(0);
        }
        if(currentAverage == 0){
          currentAverage = currentScore;
        }
        currentAverage = (currentAverage + currentScore) / 2;
        noOfRuns++;
        ws.send(JSON.stringify({score:currentScore,runs:noOfRuns}));

        //console.log("Average Performance Score is "+avg +" over "+ noOfRuns + " runs")
       // process.exit(1);
    }
   // console.error(`No Performance score provided by lighthouse.`);
   // process.exit(1);
    }, 2000); 
	}); 
	},5000);
})