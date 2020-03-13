import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import Select from 'react-select';
import {validate} from '../utils';
import {required as requiredValidator} from '../Validators'
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
  };

  handleChange = (selectedOption, onChange) => {
    onChange(selectedOption);
    this.setState(
      { selectedOption },
    );
  };

  render() {
    const {name, label, required} = this.props;
    return (
      <Field
        name={name}
        validate={validate(required ? requiredValidator() : null)}
      >
        {(props) => {
          return (
            <div className={`form-input input-select ${this.props.className}`}>
              <div className={`form-group ${props.meta.touched ? (props.meta.valid ? 'is-valid' : 'is-invalid') : ''}`}>
                <Label name={name} label={label} />
                <Select
                  className={`form-select-control ${props.meta.touched ? (props.meta.valid ? 'is-valid' : 'is-invalid') : ''}`}
                  classNamePrefix="form-select-control"
                  id={this.props.name}
                  isMulti={this.props.multiple}
                  required={true}
                  value={this.state.selectedOption ? this.state.selectedOption : props.input.value}
                  name={this.props.name}
                  onChange={(selectedOption) => this.handleChange(selectedOption, props.input.onChange)}
                  options={this.props.options}
                />
              </div>
              <Errors meta={props.meta} />
            </div>
          );
        }}
        {/*{props  => (*/}
          {/**/}
        {/*)}*/}
      </Field>
    );
  }
}

SelectInput.defaultProps = {
  label: 'Select :',
  name: 'select',
  multiple: false,
  required: false,
  className: '',
};

SelectInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectInput;