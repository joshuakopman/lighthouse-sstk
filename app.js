var express = require('express');
var path = require('path');
const SocketServer = require('ws').Server;
var lighthouseLauncher = require('./lighthouseLauncher');
var currentAverage = 0;
var noOfRuns = 1;
var currentScore = 0;
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
var cxo
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

setInterval(function(){
 	 new lighthouseLauncher().launchChromeAndRunLighthouse('https://www.shutterstock.com', {chromeFlags: ['--headless']}).then(results => {
     setTimeout(() => {
      if (results.categories.performance.score) {
        currentScore = results.categories.performance.score * 100;
        if (currentScore >= 100) {
            console.info(`Performance score is 100.`);
            process.exit(0);
        }
        if(currentAverage == 0){
          currentAverage = currentScore;
        }
        currentAverage = (currentAverage + currentScore) / 2;
        noOfRuns++;
        //console.log("Average Performance Score is "+avg +" over "+ noOfRuns + " runs")
       // process.exit(1);
    }
   // console.error(`No Performance score provided by lighthouse.`);
   // process.exit(1);
    }, 2000); 
	}); 
},5000);

const wss = new SocketServer({ server });

  wss.on('connection', function (ws) {
  	setInterval(function(){
  		try{
   			ws.send(JSON.stringify({score:currentScore,runs:noOfRuns}));
   		}
   		catch{
   			console.log('connection closed');
   		}
	},2000);
  	ws.on('message', function (message) {
    	console.log('received: %s', message)
  	})
})