'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import Opportunity from './Opportunity.js';

export default class OpportunityList extends React.Component {
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
                    return  <Opportunity {...opportunity} />
                   })
                  }
          </div>
       </div>
  )
 }
}

OpportunityList.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};