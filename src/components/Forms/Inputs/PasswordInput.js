import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required as requiredValidator} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class PasswordInput extends Component {
  render() {
    const {label, name, required, className, placeholder} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="password"
        validate={validate(required ? requiredValidator(this.props.intl.messages['form.input.password.required']) : null)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-password ${className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <Label name={name} label={label} required={required} />
                  <input
                    {...input}
                    id={name}
                    placeholder={placeholder}
                    className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
                  />
                </div>
                <Errors meta={meta}/>
              </div>
            );
          }
        }
      </Field>
    );
  }
}

PasswordInput.defaultProps = {
  className: '',
  placeholder: 'Password',
  required: false,
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default injectIntl(PasswordInput);