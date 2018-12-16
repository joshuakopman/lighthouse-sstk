'use strict';
import React from 'react';

export default class TextScore extends React.Component {
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

