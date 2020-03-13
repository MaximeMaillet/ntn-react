import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";

import {required, email} from '../Validators/index';
import {validate} from '../utils';
import {injectIntl} from "react-intl";
import Errors from "../Utils/Errors";
import Label from "../Utils/Label";

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
              <div className={`form-input input-email ${this.props.className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <Label name={this.props.name} label={this.props.intl.messages['form.input.email.label']} />
                  <input
                    {...input}
                    id={this.props.name}
                    placeholder={this.props.placeholder}
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