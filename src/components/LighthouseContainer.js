'use strict';
import React from 'react';
import TextScore from './TextScore.js';
import OpportunityList from './OpportunityList.js';
import Average from './Average.js';


export default class LighthouseContainer extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
      pages : {},
      testRunningID: ''
    };
    this.pageTypes = [];
    this.ws = new WebSocket(location.origin.replace(/^http/, 'ws'))
  }
  
  componentDidMount() {
    fetch('/types') 
      .then(response => response.json())
      .then(data => { 
        this.pageTypes = data.pageTypes;
      })

      this.ws.onmessage = ev => {
        var payload = JSON.parse(ev.data);
        this.setState({ pages : payload.globals.pages }); 
        this.setState({ testRunningID : payload.globals.testRunningID});
      }
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
      var pages = this.state.pages;
      var testRunningID = this.state.testRunningID;

      return(
         <div>
           <div className="logo">
              <img src="https://ak.picdn.net/assets/base/error/logo-white-x2.png"/>
              <h1>Lighthouse</h1>
              <img src="https://developers.google.com/web/progressive-web-apps/images/pwa-lighthouse.png" height="75px"/>
          </div>
          <div className="desc">An app to run a Lighthouse audit every five minutes and aggregate the results.</div>
          <div id="textScoresContainer" className="textScores">
            {this.pageTypes.map((pageType) => {
              if(pages[pageType.name]) {
                return <TextScore key={pageType.name + "TextScore"} {...pageType} page={pages[pageType.name]} testRunningID={testRunningID}  />
              }
             })}
         </div>
          <hr/>
          <div id="logsContainer">
              <div id="opportunitiesContainer">
                  <div id="opportunitiesTitle" className="headerTitle">Today's Performance Opportunities</div>
                  {this.pageTypes.map((pageType) => {
                    if(pages[pageType.name] && pages[pageType.name].opportunitiesArray) {
                      return <OpportunityList key={pageType.name + "Opportunities"} {...pageType} opportunities={pages[pageType.name].opportunitiesArray} />
                    }
                  })}
              </div>
              <div className="averagesContainer">
                  <div id="averagesTitle" className="headerTitle">Today's Hourly Performance Score Averages</div>
                  {this.pageTypes.map((pageType) => {
                    if(pages[pageType.name]) {
                       return <Average key={pageType.name + "Average"} {...pageType} page={pages[pageType.name]} />
                    }
                })}
              </div>
          </div>
        </div>
  );
 }
}


