import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import {injectIntl} from "react-intl";
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class CheckBoxInput extends Component {
  render() {
    const {name, label, required, className, placeholder} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="checkbox"
      >
        {
          ({ input, meta }) => {
            console.log(input);
            return (
              <div className={`form-input input-checkbox ${className}`}>
                <div className="form-check pretty p-icon p-round p-pulse">
                  <input
                    {...input}
                    id={name}
                    placeholder={placeholder}
                    className="form-check-input"
                  />
                  <div className="state p-success">
                    <i className="icon fa fa-check" />
                    <Label className="form-check-label" label={label} name={name} required={required} />
                  </div>
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

CheckBoxInput.defaultProps = {
  placeholder: 'Number',
  required: false,
  className: '',
};

CheckBoxInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default injectIntl(CheckBoxInput);