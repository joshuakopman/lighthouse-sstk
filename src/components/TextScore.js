'use strict';
import React from 'react';

export default class TextScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var styleColorRunning = (this.props.name == this.props.testRunningID) ? {'color':'white'} : {'color':'black'};
    var styleColorScore = (this.props.name == this.props.testRunningID) ? {'color':'white'} : {'color':'#f54336'};
    var displaySpinner = (this.props.name == this.props.testRunningID) ? {'display':'inline'} : {'display':'none'};

    return (
        <span id={this.props.name} style={styleColorRunning}>
          <span>Today's Lighthouse performance score average for {this.props.title} is: </span>
          <span id={this.props.name + "Score"} className="score" style={styleColorScore}>{this.props.page.currentAverage.toFixed(2)}</span>. 
          <span>This script has run </span>
          <span id={this.props.name + "Runs"} className="score" style={styleColorScore}>{this.props.page.noOfRuns}</span> times. 
          <span id={this.props.name + "Running"} className="running" style={displaySpinner}><img src="https://az620379.vo.msecnd.net/images/loading.gif" className="spinner"/></span>  
          <br></br>
        </span>
    );
  }
}

