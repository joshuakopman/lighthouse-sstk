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
          <div id={this.props.name + "Opportunities"} className="opportunities">
                  {this.props.opportunities.map((opportunity) => {
                    return  <span>
                        <span style={{"font-weight":"bold"}}>{opportunity.description}</span> 
                        <span>| Count:</span>
                        <span style={{"color":"red"}}>{opportunity.count}</span> 
                        <span>|  Time Savings: </span>
                        <span style={{"color":"red"}}>{opportunity.overallSavingsMs.toFixed(2) + "ms"}</span>
                        <br></br>
                      </span>
                   })
                  }
          </div>
       </div>
  )
 }
}

