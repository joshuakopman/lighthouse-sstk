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
          <div className="url"><a href="" className={this.props.name + "URL"}></a></div>
          <div id={this.props.name + "Opportunities"} className="opportunities"></div>
        </div>
  )
 }
}

