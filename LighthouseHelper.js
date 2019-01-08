var fs = require('fs');
var moment = require('moment-timezone');
var lighthouseLauncher = require('./LighthouseLauncher');
const constants = require('./constants');

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
        setMetricsMap(page,key,value){
          if(!page.metrics.get(key)){
            page.metrics.set(key,
            { 
              currentScore: value,
              currentBuffer : [],
              currentAverage : 0
            })
          }

          var currentMetric = page.metrics.get(key)
          currentMetric.currentBuffer.push(value);
          currentMetric.currentScore = value;
          if(currentMetric.currentAverage !=0){
              currentMetric.currentAverage = currentMetric.currentBuffer.reduce(this.getSum) / currentMetric.currentBuffer.length;
          }else {
              currentMetric.currentAverage = currentMetric.currentScore;
          }

          page.metrics.set(key,currentMetric);
        },
        runLighthouseReport:function(page,callback){
            var self = this;
            new lighthouseLauncher().launchChromeAndRunLighthouse(page.url, {chromeFlags: ['--headless']}).then(results => {
                setTimeout(() => {
                     if (results) {
                        if(results.categories && results.categories.performance.score){
                          self.setMetricsMap(page,PerformanceKey,results.categories.performance.score * 100);
                        }

                        if(results.audits && results.audits[TimeToFirstByteKey]){
                          self.setMetricsMap(page,TimeToFirstByteKey,results.audits[TimeToFirstByteKey].rawValue);
                        }

                        if(results.audits && results.audits[FirstContentfulPaintKey]){
                          self.setMetricsMap(page,FirstContentfulPaintKey,results.audits[FirstContentfulPaintKey].rawValue);
                        }

                        if(results.audits && results.audits[InteractiveKey]){
                          self.setMetricsMap(page,InteractiveKey,results.audits[InteractiveKey].rawValue);
                        }
                        page.metricsArray = [];
                        page.metrics.forEach(function(value, key, map){
                            item = {};
                            item.name = key;
                            item.currentScore = value.currentScore;
                            item.currentAverage = value.currentAverage;
                            page.metricsArray.push(item);
                        });

                        self.getOpportunities(results,page);

                        page.noOfRuns++;

                        if(new Date() - page.startTime >= ONE_DAY){
                            page.metrics = new Map();
                            page.noOfRuns = 0;
                            page.startTime = new Date();
                            page.dayReset = true;
                        }
                    }

                    if(callback){
                      callback();
                    }

                 }, 2000);
            });
        },
        writeToLogsPerformance:function(flag,filePath,metrics,noOfRuns){
              var time = new moment().tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
              var stream = fs.createWriteStream(__dirname + filePath, {flags:flag});
              stream.write("Performance: " + 
                metrics.get(PerformanceKey).currentAverage.toFixed(2) + " | TTFB: " + 
                metrics.get(TimeToFirstByteKey).currentAverage.toFixed(2) + "ms | Contentful: " +
                (metrics.get(FirstContentfulPaintKey).currentAverage/1000).toFixed(2) + "s | Interactive: " +
                (metrics.get(InteractiveKey).currentAverage/1000).toFixed(2) + "s | " +
                time +" | " + noOfRuns + " runs\n");
              stream.end();
              stream.on('error', function(err) {
                  console.log(err);
                  stream.end();
              });
        }
    }
}

module.exports = LighthouseHelper;
