var LighthouseHelper = require('./LighthouseHelper');
var globals = require('./globals'); 
const lighthouseHelper = new LighthouseHelper();

var Runner = function(){
    return {
        startAudit:function(wss){
            setInterval(function(){
                lighthouseHelper.runLighthouseReport(globals.lohp, function() {
                    lighthouseHelper.runLighthouseReport(globals.adp, function() {
                        lighthouseHelper.runLighthouseReport(globals.cmsBase, function() {
                            lighthouseHelper.runLighthouseReport(globals.cmsStudio, function() {
                                lighthouseHelper.runLighthouseReport(globals.search) 
                            }) 
                        })
                    })
                })
            },300000);

            //Write to log file on host with current average perf score every hour in case server crashes; clear log daily
            setInterval(function(){
              for(var pageTypeIndex in globals.pageTypes){
                  var currentPage = globals.pageTypes[pageTypeIndex];
                  if(globals[currentPage].dayReset == true) {
                      lighthouseHelper.writeToLogsPerformance('w',"/logs/performance_scores_"+ currentPage +".txt",globals[currentPage].currentAverage.toFixed(2),globals[currentPage].noOfRuns);
                      globals[currentPage].dayReset = false;
                  }
                  else {
                      lighthouseHelper.writeToLogsPerformance('a',"/logs/performance_scores_"+ currentPage +".txt",globals[currentPage].currentAverage.toFixed(2),globals[currentPage].noOfRuns);
                  }
              }
              //writeToLogsOpportunity('w','logs/opportunities_lohp.txt',opportunitiesglobals.lohp.;

            },3600000);
        
            wss.on('connection', function (ws) {
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