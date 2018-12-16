'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import TextScore from './TextScore.js';

class LighthouseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTypes: [],
    };
  }

  componentDidMount() {
    fetch('/types') // or whatever URL you want
      .then(response => response.json())
      .then(data => { 
        let pageTypes = data.pageTypes; 
        this.setState({ pageTypes : pageTypes }); 
      })
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
          <div className="desc">An app to run a Lighthouse audit on shutterstock.com every five minutes and aggregate the results.</div>
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
                    return <div>
                      <div className="pageTitle">{pageType.title}</div>
                      <div className="url"><a href="" className={pageType.name + "URL"}></a></div>
                      <div id={pageType.name + "Opportunities"} className="opportunities"></div>
                    </div>
                  })}
              </div>
              <div className="averagesContainer">
                  <div id="averagesTitle" className="headerTitle">Today's Hourly Performance Score Averages</div>
                  {pageTypes.map((pageType) => {
                    return <div>                  
                      <div className="pageTitle">{pageType.title}</div>
                      <div className="url"><a href="" className={pageType.name + "URL"}></a></div>
                      <iframe src={"/logs/performance_scores_" + pageType.name + ".txt"} className="log"></iframe>
                    </div>
                })}
              </div>
          </div>
      </div>
  );
 }
}

let domContainer = document.querySelector('#lighthouseContainer');
ReactDOM.render(<LighthouseContainer />, domContainer);