'use strict';
import React from 'react';
import PropTypes from 'prop-types';

export default class Average extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>                  
          <div className="pageTitle">{this.props.title}</div>
          <div className="url"><a href={this.props.url} className={this.props.name + "URL"}>{this.props.url}</a></div>
          <iframe src={"/logs/performance_scores_" + this.props.name + ".txt"} className="log"></iframe>
        </div>
  )
 }
}

Average.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};