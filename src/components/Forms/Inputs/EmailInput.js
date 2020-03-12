import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required, email} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";

class EmailInput extends Component {
  render() {
    return (
      <Field
        name={this.props.name}
        component="input"
        type="email"
        validate={validate(this.props.required ? required(this.props.intl.messages['form.input.email.required']) : null, email)}
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

EmailInput.defaultProps = {
  label: 'E-mail :',
  name: 'email',
  placeholder: 'E-mail',
  required: false,
};

EmailInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(EmailInput);