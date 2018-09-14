const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

var LighthouseLauncher = function(){

  return {
       launchChromeAndRunLighthouse: function(url, opts, config = null) {
        return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
          opts.port = chrome.port;
          return lighthouse(url, opts, config).then(results => {
            return chrome.kill().then(() => results.lhr)
          }).catch(error => {
            console.log(error);
          });
        }).catch(error => {
          console.log(error);
       });
      }
}

}
module.exports = LighthouseLauncher