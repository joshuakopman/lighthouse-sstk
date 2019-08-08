var LighthouseHelper = require('./LighthouseHelper');
const lighthouseHelper = new LighthouseHelper();
const constants = require('./constants');
var Globals = require('./globals'); 
var globals = new Globals();

class Runner {

  async performSingleRun(pageType) {
        var currentPageName = pageType.name;
        globals.testRunningID = currentPageName;
        await lighthouseHelper.runLighthouseReport(globals.pages[currentPageName]);
  }

  async performAllRuns() {
    for(var x=0;x<globals.pageTypes.length;x++) {
       await this.performSingleRun(globals.pageTypes[x]);
    }
  }

  async runForever(){
    while(true){ 
      await this.performAllRuns();
    }
  }

  startAudit(wss){
      //Write to log file on host with current average perf score every hour in case server crashes; clear log daily
      setInterval(function(){
        for(var pageTypeIndex in globals.pageTypes){
            var currentPage = globals.pageTypes[pageTypeIndex].name;
            if(globals.pages[currentPage].dayReset == true) {
                lighthouseHelper.writeToLogsPerformance('w',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].metrics,globals.pages[currentPage].noOfRuns);
                globals.pages[currentPage].dayReset = false;
            }
            else {
                lighthouseHelper.writeToLogsPerformance('a',"/logs/performance_scores_"+ currentPage +".txt",globals.pages[currentPage].metrics,globals.pages[currentPage].noOfRuns);
            }
        }

      },3600000);
  
      wss.on('connection', function (ws) {
          var self = this;
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
        },50);
      })

      this.runForever();
  }
}

module.exports = Runner;