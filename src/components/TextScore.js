'use strict';
import React from 'react';
import PropTypes from 'prop-types';

export default class TextScore extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var colorRunningClass = (this.props.name == this.props.testRunningID) ? "active" : "inactive";
    var colorScoreClass = (this.props.name == this.props.testRunningID) ? "active" : "red";
    var displaySpinnerClass = (this.props.name == this.props.testRunningID) ? "showSpinner" : "hideSpinner";

    return (
        <span id={this.props.name} className={colorRunningClass}>
          <span>Today's Lighthouse performance score average for {this.props.title} is: </span>
          <span id={this.props.name + "Score"} className={"score " + colorScoreClass}>{this.props.page.currentAverage.toFixed(2)}</span>. 
          <span> This script has run </span>
          <span id={this.props.name + "Runs"} className={"score "+ colorScoreClass}>{this.props.page.noOfRuns}</span> times. 
          <span id={this.props.name + "Running"} className={"running " + displaySpinnerClass}><img src="https://az620379.vo.msecnd.net/images/loading.gif" className="spinner"/></span>  
          <br></br>
        </span>
    );
  }
}

TextScore.propTypes = {
  name: PropTypes.string.isRequired,
  testRunningID: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
};