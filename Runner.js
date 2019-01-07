var LighthouseHelper = require('./LighthouseHelper');
var Globals = require('./globals'); 
const lighthouseHelper = new LighthouseHelper();

var Runner = function(){
    return {
        startAudit : function(wss) {
            var globals = new Globals();
            setInterval(function() {
                var currentPage = globals.pageTypes[0].name;
                globals.testRunningID = currentPage;
                lighthouseHelper.runLighthouseReport(globals.pages[currentPage], function() {
                  var currentPage = globals.pageTypes[1].name;
                  globals.testRunningID = currentPage;
                    lighthouseHelper.runLighthouseReport(globals.pages[currentPage], function() {
                        var currentPage = globals.pageTypes[2].name;
                        globals.testRunningID = currentPage;
                        lighthouseHelper.runLighthouseReport(globals.pages[currentPage], function() {
                            var currentPage = globals.pageTypes[3].name;
                            globals.testRunningID = currentPage;
                            lighthouseHelper.runLighthouseReport(globals.pages[currentPage], function() {
                                var currentPage = globals.pageTypes[4].name;
                                globals.testRunningID = currentPage;
                                lighthouseHelper.runLighthouseReport(globals.pages[currentPage], function() {
                                  globals.testRunningID = "";
                                }); 
                            }) 
                        })
                    })
                })
            },300000);

            //Write to log file on host with current average perf score every hour in case server crashes; clear log daily
            setInterval(function(){
              for(var pageTypeIndex in globals.pageTypes){
                  var currentPage = globals.pageTypes[pageTypeIndex].name;
                  if(globals.pages[currentPage].dayReset == true) {
                      lighthouseHelper.writeToLogsPerformance('w',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].currentAverage.toFixed(1),globals.pages[currentPage].currentTTFBAverage.toFixed(),globals.pages[currentPage].noOfRuns);
                      globals.pages[currentPage].dayReset = false;
                  }
                  else {
                      lighthouseHelper.writeToLogsPerformance('a',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].currentAverage.toFixed(1),globals.pages[currentPage].currentTTFBAverage.toFixed(),globals.pages[currentPage].noOfRuns);
                  }
              }

            },3600000);
        
            wss.on('connection', function (ws) {
              console.log('connected to server');
                var scoreSocketID = setInterval(function(){
                    try{
                        ws.send(JSON.stringify(
                        {
                          globals:globals
                        }));
                    }
                    catch(err){
                        console.log('client closed socket connection'+err);
                        clearInterval(scoreSocketID);
                    }
              },500);
            })
        }
    }
}

module.exports = Runner;