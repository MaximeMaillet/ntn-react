import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import AsyncCreatableSelect from 'react-select/async-creatable';
import {validate} from '../utils';
import {required as requiredValidator} from '../Validators'
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";

class SelectCreatableInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
  };

  handleChange = (selectedOption, onChange) => {
    onChange(this.transformSelected(selectedOption));
    this.setState(
      { selectedOption },
    );
  };

  transformValue = (value) => {
    if(this.props.transformValue) {
      return this.props.transformValue(value);
    }

    return value;
  };

  transformSelected = (selected) => {
    if(this.props.transformSelected) {
      return this.props.transformSelected(selected);
    }

    return selected;
  };

  loadOptions = async(inputValue) => {
    if(this.props.loadOptions) {
      return this.props.loadOptions(inputValue);
    }

    return this.props.options.filter(o => o.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  render() {
    const {name, label, options, required, className, multiple} = this.props;
    return (
      <Field
        name={name}
        validate={validate(required ? requiredValidator() : null)}
      >
        {({input, meta}) => {
          return (
            <div className={`form-input input-select ${className}`}>
              <div className={`form-group ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}>
                {label && <Label name={name} label={label} required={required} />}
                <AsyncCreatableSelect
                  className={`form-select-control ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}
                  classNamePrefix="form-select-control"
                  id={name}
                  name={name}
                  isMulti={multiple}
                  required={true}
                  defaultOptions={options}
                  loadOptions={this.loadOptions}
                  value={this.state.selectedOption ? this.state.selectedOption : this.transformValue(input.value)}
                  onChange={(selectedOption) => this.handleChange(selectedOption, input.onChange)}
                  options={options}
                />
              </div>
              <Errors meta={meta} />
            </div>
          );
        }}
      </Field>
    );
  }
}

SelectCreatableInput.defaultProps = {
  multiple: false,
  required: false,
  className: '',
};

SelectCreatableInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  loadOptions: PropTypes.func,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectCreatableInput;