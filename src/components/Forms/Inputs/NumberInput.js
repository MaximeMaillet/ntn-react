import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required, number} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";

class NumberInput extends Component {
  render() {
    return (
      <Field
        name={this.props.name}
        component="input"
        type="number"
        validate={validate(this.props.required ? required(this.props.intl.messages['form.generic.input.required']) : null, number)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className="form-group">
                <label
                  htmlFor={this.props.name}
                >
                  {this.props.label}{this.props.required ? '*':''}
                </label>
                <input
                  {...input}
                  id={this.props.name}
                  placeholder={this.props.placeholder}
                  className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
                />
                {
                  (meta.touched && (meta.error || meta.submitError)) &&
                  <div className="invalid-feedback">
                    {meta.error || meta.submitError}
                  </div>
                }
              </div>
            );
          }
        }
      </Field>
    );
  }
}

NumberInput.defaultProps = {
  label: 'Number',
  name: 'number',
  placeholder: 'Number',
  required: false,
};

NumberInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(NumberInput);