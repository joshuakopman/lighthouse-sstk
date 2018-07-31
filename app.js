var express = require('express');
var path = require('path');
var lighthouseLauncher = require('./lighthouseLauncher');

var currentAverage = 0;
var noOfRuns = 1;
var currentScore = 0;

const SocketServer = require('ws').Server;
const PORT = process.env.PORT || 3000;
const server = express()
  .use((req, res) => res.sendFile('index.html', { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

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
        }
      }, 2000); 
	}); 
},5000);

  wss.on('connection', function (ws) {
  	setInterval(function(){
  		try{
   			ws.send(JSON.stringify({score:currentScore,runs:noOfRuns}));
   		}
   		catch(err){
   			console.log('connection closed');
   		}
	},2000);
  })