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
    var ttfb = this.props.page.metricsArray.find(x => x.name == "time-to-first-byte");
    var perf = this.props.page.metricsArray.find(x => x.name == "performance");
    var contentful = this.props.page.metricsArray.find(x => x.name == "first-contentful-paint");
    var estimatedinputlatency = this.props.page.metricsArray.find(x => x.name == "estimated-input-latency");

    return (
        <span id={this.props.name} className={colorRunningClass}>
          <span>Today's averages for {this.props.title}: </span>
          <div>
            <span>Performance: </span>
            <span id={this.props.name + "Score"} className={"score " + colorScoreClass}>{ (perf) ? perf.currentAverage.toFixed(2) + " " : 0 + " "}</span>
            <span>Time To First Byte: </span>
            <span id={this.props.name + "Score"} className={"score " + colorScoreClass}>{ (ttfb) ? ttfb.currentAverage.toFixed(2) + "ms " : 0 + "ms "}</span> 
            <span>First Contentful Paint: </span>
            <span id={this.props.name + "Score"} className={"score " + colorScoreClass}>{ (contentful) ? (contentful.currentAverage/1000).toFixed(2) + "s " : 0 + "s "}</span>
            <span>Estimated Input Latency: </span>
            <span id={this.props.name + "Score"} className={"score " + colorScoreClass}>{ (estimatedinputlatency) ? (estimatedinputlatency.currentAverage/1000).toFixed(2) + "ms " : 0 + "ms "}</span>  
            <span> (This script has run </span>
            <span id={this.props.name + "Runs"} className={"score "+ colorScoreClass}>{this.props.page.noOfRuns}</span> times) 
            <span id={this.props.name + "Running"} className={"running " + displaySpinnerClass}><img src="https://az620379.vo.msecnd.net/images/loading.gif" className="spinner"/></span>  
          </div>
        </span>
    );
  }
}

TextScore.propTypes = {
  name: PropTypes.string.isRequired,
  testRunningID: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
};