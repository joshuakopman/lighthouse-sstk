var LighthouseHelper = require('./LighthouseHelper');
var Globals = require('./globals'); 
const lighthouseHelper = new LighthouseHelper();

var Runner = function(){
    return {
        startAudit : function(wss) {
            var globals = new Globals();
            setInterval(function() {
                globals.testRunningID = globals.pages.lohp.pageType;
                lighthouseHelper.runLighthouseReport(globals.pages.lohp, function() {
                    globals.testRunningID = globals.pages.adp.pageType;
                    lighthouseHelper.runLighthouseReport(globals.pages.adp, function() {
                       globals.testRunningID = globals.pages.cmsStudioExplore.pageType;
                        lighthouseHelper.runLighthouseReport(globals.pages.cmsStudioExplore, function() {
                            globals.testRunningID = globals.pages.cmsStudioLOHP.pageType;
                            lighthouseHelper.runLighthouseReport(globals.pages.cmsStudioLOHP, function() {
                                globals.testRunningID = globals.pages.search.pageType;
                                lighthouseHelper.runLighthouseReport(globals.pages.search, function() {
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
                      lighthouseHelper.writeToLogsPerformance('w',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].currentAverage.toFixed(2),globals.pages[currentPage].noOfRuns);
                      globals.pages[currentPage].dayReset = false;
                  }
                  else {
                      lighthouseHelper.writeToLogsPerformance('a',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].currentAverage.toFixed(2),globals.pages[currentPage].noOfRuns);
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