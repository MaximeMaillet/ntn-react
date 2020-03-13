import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Label extends Component {
  render() {
    const {name, label, required} = this.props;
    return (
      <label className="form-label" htmlFor={name}>
        {label}{required ? '*' :''}
      </label>
    );
  }
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

export default Label;