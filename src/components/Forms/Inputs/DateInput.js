import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {Field} from "react-final-form";
import {required as requiredValidator} from '../Validators/index';
import {validate} from '../utils';
import Errors from "../Utils/Errors";
import Label from "../Utils/Label";
import DatePicker from "react-datepicker";
import moment from 'moment';

class DateInput extends Component {
  render() {
    const {className, format, name, required, label} = this.props;
    return (
      <Field
        name={name}
        validate={validate(required ? requiredValidator(this.props.intl.messages['form.input.email.required']) : null)}
      >
        {
          ({ input, meta }) => {
            return (
              <div className={`form-input input-email ${className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  {label && <Label name={name} label={label} required={required} />}
                  <DatePicker
                    onChange={input.onChange}
                    selected={input.value ? new Date(input.value) : new Date()}
                    dateFormat={format ? format : 'yyyy'}
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

DateInput.defaultProps = {
  className: '',
  required: false,
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
};

export default injectIntl(DateInput);