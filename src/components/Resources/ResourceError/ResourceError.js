import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './resource-error.scss'

export class ResourceError extends Component {
  render() {
    const {className, text, title} = this.props;
    return (
      <div className={`resource-error-background ${className}`}>
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

ResourceError.defaultProps = {
  className: '',
  title: 'Error',
  text: '',
};

ResourceError.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default ResourceError;
