import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import {injectIntl} from "react-intl";
import {required as requiredValidator, number} from '../Validators/index';
import {validate} from '../utils';
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class NumberInput extends Component {
  render() {
    const {name, label, required, className, placeholder} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="number"
        validate={validate(required ? requiredValidator(this.props.intl.messages['form.generic.input.required']) : null, number)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-number ${className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <Label label={label} name={name} required={required} />
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

NumberInput.defaultProps = {
  placeholder: 'Number',
  required: false,
  className: '',
};

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default injectIntl(NumberInput);