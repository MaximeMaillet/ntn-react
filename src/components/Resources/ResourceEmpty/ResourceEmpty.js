import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './resource-empty.scss'

export class ResourceEmpty extends Component {
  render() {
    const {className, text, title} = this.props;
    return (
      <div className={`resource-empty-background ${className}`}>
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

ResourceEmpty.defaultProps = {
  className: '',
  title: '',
  text: '',
};

ResourceEmpty.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

export default ResourceEmpty;
