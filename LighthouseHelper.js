var fs = require('fs');
var moment = require('moment-timezone');
var globals = require('./globals'); 
var lighthouseLauncher = require('./LighthouseLauncher');

const ONE_DAY =  24 * 60 * 60 * 1000;

var LighthouseHelper = function(){

    return{
        getOpportunities:function(results,page){
            if(results.audits){
              var auditsArray = Object.keys(results.audits).map(function(k) { return results.audits[k] });
              var valulableOpportunities  = auditsArray.filter(audit => 
                    audit.details 
                    && audit.details.type == "opportunity" 
                    && (audit.details.overallSavingsMs > 0 || audit.details.overallSavingsBytes > 0)
                );

              for(var opKey in valulableOpportunities){
                  var opportunity = valulableOpportunities[opKey];
                  opportunity.description = opportunity.description.substring(0, opportunity.description.indexOf('['));
                  if(page.opportunities.has(opportunity.description)){
                    var value  = page.opportunities.get(opportunity.description);
                    value.count = value.count + 1;
                    value.overallSavingsMs = opportunity.details.overallSavingsMs;
                    page.opportunities.set(opportunity.description,value);
                  }else{
                    page.opportunities.set(opportunity.description,{count: 1, overallSavingsMs: opportunity.details.overallSavingsMs});
                  }
              }

              page.opportunitiesArray = [];

              page.opportunities.forEach(function(value, key, map){
                  item = {};
                  item.description = key;
                  item.count = value.count;
                  item.overallSavingsMs = value.overallSavingsMs;
                  page.opportunitiesArray.push(item);
              });
          }
        },
        getSum:function(total, num) {
            return total + num;
        },
        runLighthouseReport:function(page,callback){
            var self = this;
            globals.testRunningID = page.pageType;
            new lighthouseLauncher().launchChromeAndRunLighthouse(page.url, {chromeFlags: ['--headless']}).then(results => {
                setTimeout(() => {
                     if (results && results.categories && results.categories.performance.score) {
                          page.currentScore = results.categories.performance.score * 100;
                          page.currentBuffer.push(page.currentScore);

                          if(page.currentAverage != 0) {
                             page.currentAverage = page.currentBuffer.reduce(self.getSum) / page.currentBuffer.length;
                          }else{
                             page.currentAverage = page.currentScore;
                          }

                          self.getOpportunities(results,page);

                          page.noOfRuns++;

                          if(new Date() - page.startTime >= ONE_DAY){
                              page.currentBuffer = [];
                              page.currentAverage = 0;
                              page.currentScore = 0;
                              page.noOfRuns = 0;
                              page.startTime = new Date();
                              page.dayReset = true;
                           }
                    }

                    if(globals.testRunningID == 'search'){
                      globals.testRunningID = '';
                    }
                    
                    if(callback){
                      callback();
                    }

                 }, 2000);
            });
        },
        writeToLogsPerformance:function(flag,filePath,avg,noOfRuns){
              var time = new moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
              var stream = fs.createWriteStream(__dirname + filePath, {flags:flag});
              stream.write("Current Average Performance: " + avg + " at time: "+ time +" after "+noOfRuns+" runs\n");
              stream.end();
              stream.on('error', function(err) {
                  console.log(err);
                  stream.end();
              });
        }
    }
}

/*function writeToLogsOpportunity(flag,filePath,ops){
      var time = new moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
      var stream = fs.createWriteStream(__dirname + filePath, {flags:flag});
      stream.write("Current Top Opportunities at: " + time + "\n");
      
     /* var sorted = opportunitiesglobals.lohp..slice().sort(function(a, b) {
        return b - a; 
      });
      

      opportunitiesglobals.lohp.forEach(function(value,key) {       
        stream.write(key+" " + value+ " times"+"\n");
      });
      
      stream.end();
      stream.on('error', function(err) {
          console.log(err);
          stream.end();
      });
}*/


module.exports = LighthouseHelper;
