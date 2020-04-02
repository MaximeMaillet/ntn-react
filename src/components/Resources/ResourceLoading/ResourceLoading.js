import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './resource-loading.scss'

export class ResourceLoading extends Component {
  render() {
    const {className, text, title} = this.props;
    return (
      <div className={`resource-loading-background ${className}`}>
        <div className="title">
          {title}
        </div>
        <div className="text">
          {text}
        </div>
      </div>
    );
  }
}

ResourceLoading.defaultProps = {
  className: '',
  title: 'Loading',
  text: '',
};

ResourceLoading.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default ResourceLoading;
