import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";

class PasswordInput extends Component {
  render() {
    return (
      <Field
        name={this.props.name}
        component="input"
        type="password"
        validate={validate(this.props.required ? required(this.props.intl.messages['form.input.password.required']) : null)}
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

PasswordInput.defaultProps = {
  label: 'Password :',
  name: 'password',
  placeholder: 'Password',
  required: false,
};

PasswordInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(PasswordInput);