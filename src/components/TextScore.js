'use strict';
import React from 'react';
import PropTypes from 'prop-types';

export default class TextScore extends React.Component {
  constructor(props) {
    super(props);
  }
  determineColorClass(val){
    if(this.props.name == this.props.testRunningID) {
      return "active";
    }

    if(val && val.currentAverage) {
      if(val.currentAverage <= 49){
        return "red";
      }else if(val.currentAverage >= 50 && val.currentAverage <= 89){
        return "orange";
      }else{
        return "green";
      }
    }

    return "red";
  }
  render() {
    var colorRunningClass = (this.props.name == this.props.testRunningID) ? "active" : "inactive";
    var displaySpinnerClass = (this.props.name == this.props.testRunningID) ? "showSpinner" : "hideSpinner";
    var speedIndex = this.props.page.metricsArray.find(x => x.name == "speed-index");
    var perf = this.props.page.metricsArray.find(x => x.name == "performance");
    var contentful = this.props.page.metricsArray.find(x => x.name == "first-contentful-paint");
    var interactive = this.props.page.metricsArray.find(x => x.name == "interactive");
    var cumulativeLayoutIndex = this.props.page.metricsArray.find(x => x.name == "cumulative-layout-shift");

    return (
        <span id={this.props.name} className={colorRunningClass}>
          <span>Today's averages for {this.props.title}: </span>
          <div>
            <span>Performance: </span>
            <span id={this.props.name + "Score"} className={"score " + this.determineColorClass(perf)}>{ (perf) ? perf.currentAverage.toFixed(2) + " " : 0 + " "}</span>
            <span>Speed Index: </span>
            <span id={this.props.name + "Score"} className={"score " + this.determineColorClass()}>{ (speedIndex) ? speedIndex.currentAverage.toFixed(2) + "ms " : 0 + "ms "}</span> 
            <span>First Contentful Paint: </span>
            <span id={this.props.name + "Score"} className={"score " + this.determineColorClass()}>{ (contentful) ? (contentful.currentAverage/1000).toFixed(2) + "s " : 0 + "s "}</span>
            <span>Interactive: </span>
            <span id={this.props.name + "Score"} className={"score " + this.determineColorClass()}>{ (interactive) ? (interactive.currentAverage).toFixed(2) + "ms " : 0 + "ms "}</span>  
            <span>Cumulative Layout Shift: </span>
            <span id={this.props.name + "Score"} className={"score " + this.determineColorClass()}>{ (cumulativeLayoutIndex) ? (cumulativeLayoutIndex.currentAverage).toFixed(2) + " " : 0 + " "}</span>  
            <span> (This script has run </span>
            <span id={this.props.name + "Runs"} className={"score "+ this.determineColorClass()}>{this.props.page.noOfRuns}</span> times) 
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