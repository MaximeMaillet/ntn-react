import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    const {name, label, required, className} = this.props;
    return (
      <label className={`form-label ${className}`} htmlFor={name}>
        {label}{required ? '*' :''}
      </label>
    );
  }
}

Label.defaultProps = {
  required: false,
  className: '',
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default Label;