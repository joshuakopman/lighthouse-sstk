'use strict';
import React from 'react';

export default class TextScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span id={this.props.name}>
          <span>Today's Lighthouse performance score average for {this.props.title} is: </span>
          <span id={this.props.name + "Score"} className="score">{this.props.page.currentAverage.toFixed(2)}</span>. 
          <span>This script has run </span>
          <span id={this.props.name + "Runs"} className="score">{this.props.page.noOfRuns}</span> times. 
          <span id={this.props.name + "Running"} className="running"><img src="https://az620379.vo.msecnd.net/images/loading.gif" className="spinner"/></span>  
          <br></br>
        </span>
    );
  }
}

