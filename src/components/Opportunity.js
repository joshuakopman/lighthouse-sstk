'use strict';
import React from 'react';
import PropTypes from 'prop-types';

export default class Opportunity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span>
          <span className="bold">{this.props.description}</span> 
          <span>| Count:</span>
          <span className="red">{this.props.count}</span> 
          <span>|  Time Savings: </span>
          <span className="red">{this.props.overallSavingsMs.toFixed(2) + "ms"}</span>
          <br></br>
        </span>
)
 }
}

Opportunity.propTypes = {
  description: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  overallSavingsMs: PropTypes.number.isRequired
};