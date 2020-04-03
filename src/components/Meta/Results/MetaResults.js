import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './meta-results.scss';
import MetaDetail from "../Detail/MetaDetail";
import {FormattedMessage} from "react-intl";

class MetaResults extends Component {
  selectItem = (meta) => {
    if(this.props.onSelect) {
      this.props.onSelect(meta);
    }
  };

  render() {
    const {className, results, isSelectable} = this.props;
    return (
      <div className={`meta-results ${className}`}>
        {
          results && results.map((result, key) => {
            return (
              <div key={key} className={`results-item ${isSelectable ? 'is-selectable' : ''}`}>
                <MetaDetail
                  {...result}
                />
                <div className="fallback-select">
                  <button className="btn btn-primary" onClick={() => this.selectItem(result)}>
                    <FormattedMessage id="component.meta.results.select.cta"/>
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

MetaResults.propTypes = {
  isSelectable: false,
  results: [],
};

MetaResults.propTypes = {
  isSelectable: PropTypes.bool,
  results: PropTypes.array,
};

export default MetaResults;