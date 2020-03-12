import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

class HiddenInput extends Component {
  render() {
    return (
      <Field
        name={this.props.name}
        component="input"
        type="hidden"
      />
    );
  }
}

HiddenInput.defaultProps = {
  name: 'hidden',
  required: false,
};

HiddenInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default HiddenInput;