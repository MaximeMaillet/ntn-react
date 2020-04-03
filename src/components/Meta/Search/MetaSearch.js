import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MetaSearchBar from "../SearchBar/MetaSearchBar";
import './meta-search.scss';
import MetaResults from "../Results/MetaResults";

class MetaSearch extends Component {
  render() {
    const {className, results, search} = this.props;
    return (
      <div className={`meta-search ${className}`}>
        <MetaSearchBar
          value={search}
          onSearch={this.props.onSearch}
        />
        <MetaResults
          results={results}
          isSelectable
          onSelect={this.props.onSelectItem}
        />
      </div>
    );
  }
}

MetaSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MetaSearch;