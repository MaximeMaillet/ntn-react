import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {Field} from "react-final-form";
import {required as requiredValidator} from '../Validators/index';
import {validate} from '../utils';
import Errors from "../Utils/Errors";
import Label from "../Utils/Label";

class LongTextInput extends Component {
  render() {
    const {className, placeholder, name, required, label} = this.props;
    return (
      <Field
        name={name}
        component="textarea"
        validate={validate(required ? requiredValidator() : null)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-textarea ${className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  {label && <Label name={name} label={label} required={required} />}
                  <textarea
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

LongTextInput.defaultProps = {
  className: '',
  required: false,
};

LongTextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(LongTextInput);