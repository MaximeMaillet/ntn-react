import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import Select from 'react-select';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
  };

  handleChange = (selectedOption, onChange) => {
    if(this.props.multiple) {
      onChange(selectedOption && selectedOption.length > 0 ? selectedOption.map((s) => s.value) : null);
    } else {
      onChange(selectedOption ? selectedOption.value : null);
    }
    this.setState(
      { selectedOption },
    );
  };

  render() {
    return (
      <Field name={this.props.name}>
        {props  => (
          <div className="form-group">
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <Select
              className={`form-select-control ${props.meta.touched && (props.meta.valid ? 'is-valid' : 'is-invalid')}`}
              classNamePrefix="form-select-control"
              id={this.props.name}
              isMulti={this.props.multiple}
              value={this.state.selectedOption}
              name={this.props.name}
              onChange={(selectedOption) => this.handleChange(selectedOption, props.input.onChange)}
              options={this.props.options}
            />
          </div>
        )}
      </Field>
    );
  }
}

SelectInput.defaultProps = {
  label: 'Select :',
  name: 'select',
  multiple: false,
  required: false,
};

SelectInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default SelectInput;