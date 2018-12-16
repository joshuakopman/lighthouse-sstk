'use strict';
import React from 'react';
import TextScore from './TextScore.js';
import Opportunity from './Opportunity.js';
import Average from './Average.js';


export default class LighthouseContainer extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      pageTypes : [],
    };
    this.host = location.origin.replace(/^http/, 'ws');
    this.ws = new WebSocket(this.host)
  }

  componentDidMount() {
    fetch('/types') 
      .then(response => response.json())
      .then(data => { 
        let pageTypes = data.pageTypes; 
        this.setState({ pageTypes : pageTypes }); 
      })

    this.ws.onmessage = function (ev) { 
      var payload = JSON.parse(ev.data);
       for(var index in payload.globals.pageTypes){
            var currentPage = payload.globals.pageTypes[index].name;
            if(document.querySelector("#" + currentPage + "Score")){
                document.querySelector("#" + currentPage + "Score").innerHTML = payload.globals.pages[currentPage].currentAverage.toFixed(2);
            }
            if(document.querySelector("#" + currentPage + "Runs")){
                document.querySelector("#" + currentPage + "Runs").innerHTML = payload.globals.pages[currentPage].noOfRuns;
            }
            if(payload.globals.pages[currentPage].opportunitiesArray.length > 0){
                document.querySelector("#" + currentPage + "Opportunities").innerHTML = formatOpsString(payload.globals.pages[currentPage].opportunitiesArray);
            }

            document.querySelectorAll("." + currentPage + "URL").forEach(el => {
                el.href = payload.globals.pages[currentPage].url;
                el.innerHTML = payload.globals.pages[currentPage].url;
            });
        }

        showActiveTest(payload.globals.testRunningID);

    }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
      const pageTypes = this.state.pageTypes;
      return(
         <div>
           <div className="logo">
              <img src="https://ak.picdn.net/assets/base/error/logo-white-x2.png"/>
              <h1>Lighthouse</h1>
              <img src="https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png" height="75px"/>
          </div>
          <div className="desc">An app to run a Lighthouse audit every five minutes and aggregate the results.</div>
          <div id="textScoresContainer" className="textScores">
            {pageTypes.map((pageType) => {
               return <TextScore {...pageType} />
             })}
         </div>
          <hr/>
          <div id="logsContainer">
              <div id="opportunitiesContainer">
                  <div id="opportunitiesTitle" className="headerTitle">Today's Performance Opportunities</div>
                  {pageTypes.map((pageType) => {
                    return <Opportunity {...pageType} />
                  })}
              </div>
              <div className="averagesContainer">
                  <div id="averagesTitle" className="headerTitle">Today's Hourly Performance Score Averages</div>
                  {pageTypes.map((pageType) => {
                    return <Average {...pageType} />
                })}
              </div>
          </div>
      </div>
  );
 }

 formatOpsString(opportunities){
        var opString = '';
        for(var index in opportunities){   
            if(opportunities[index] && opportunities[index].overallSavingsMs > 0){
              opString += "<span style=\"font-weight:bold\">"+ opportunities[index].description + "</span> |  Count: <span style=\"color:red\">" + opportunities[index].count + "</span> |  Time Savings: <span style=\"color:red\">" + opportunities[index].overallSavingsMs.toFixed(2) + " ms</span><br></br>";
            }
        }
        return opString;
    }

 showActiveTest(ID){
         document.querySelectorAll('.textScores span').forEach(el => {
            el.style.color = 'black';
         });    

         document.querySelectorAll('.score').forEach(el => {
            el.style.color = '#f54336';
         });    

         document.querySelectorAll('.running').forEach(el => {
            el.style.display = 'none';
         });
        

        if(ID != '') {
            document.querySelector("#"+ID).style.color = 'white';
            document.querySelector("#"+ID+"Score").style.color = 'white';
            document.querySelector("#"+ID+"Runs").style.color = 'white';
            document.querySelector("#"+ID+"Running").style.display = 'inline';
        }
    }
}
