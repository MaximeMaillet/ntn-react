import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import CreatableSelect from 'react-select/creatable';

import './search-bar.scss'

class MetaSearchBar extends Component {
  handleChange = (newValue) => {
    if(!newValue) {
      this.props.onSearch({title: ''});
      return;
    }
    this.props.onSearch({title: newValue.map((v) => v.value)})
  };
  render() {
    const {value} = this.props;
    return (
      <div className="meta-search-bar">
        <label htmlFor="search-bar">
          <FormattedMessage id="component.meta.search_bar.label" />
        </label>
        <CreatableSelect
          className="search-bar"
          id="search-bar"
          isClearable
          isMulti
          value={value && value.title ? value.title.map((v) => ({label:v, value:v})) : null}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

MetaSearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MetaSearchBar;