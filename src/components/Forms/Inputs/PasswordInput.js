import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class PasswordInput extends Component {
  render() {
    const {label, name} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="password"
        validate={validate(this.props.required ? required(this.props.intl.messages['form.input.password.required']) : null)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-password ${this.props.className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <Label name={name} label={label ? label : this.props.intl.messages['form.input.password.label']}/>
                  <input
                    {...input}
                    id={this.props.name}
                    placeholder={this.props.placeholder}
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