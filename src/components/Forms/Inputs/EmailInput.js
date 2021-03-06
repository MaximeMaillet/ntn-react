import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {Field} from "react-final-form";
import {required as requiredValidator, email} from '../Validators/index';
import {validate} from '../utils';
import Errors from "../Utils/Errors";
import Label from "../Utils/Label";

class EmailInput extends Component {
  render() {
    const {className, placeholder, name, required, label} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="email"
        validate={validate(required ? requiredValidator(this.props.intl.messages['form.input.email.required']) : null, email)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-email ${className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <Label name={name} label={label} required={required} />
                  <input
                    {...input}
                    id={name}
                    placeholder={placeholder}
                    className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
                  />
                </div>
                <Errors meta={meta} />
              </div>
            );
          }
        }
      </Field>
    );
  }
}

EmailInput.defaultProps = {
  className: '',
  placeholder: 'E-mail',
  required: false,
};

EmailInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(EmailInput);