import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import Select from 'react-select';

class BitwiseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
  };

  handleChange = (selectedOption, onChange) => {
    if(this.props.multiple) {
      onChange(selectedOption && selectedOption.length > 0 ? selectedOption.map((s) => s.value).reduce((acc, s) => acc | s) : null);
    } else {
      onChange(selectedOption ? selectedOption.value : null);
    }

    this.setState(
      { selectedOption },
    );
  };

  transformToInput = (value) => {
    const options = [];
    for(const i in this.props.options) {
      if((this.props.options[i].value & value) !== 0) {
        options.push(this.props.options[i]);
      }
    }
    return options;
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
              value={this.state.selectedOption ? this.state.selectedOptions : this.transformToInput(props.input.value)}
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

BitwiseInput.defaultProps = {
  label: 'Select :',
  name: 'select',
  multiple: false,
  required: false,
};

BitwiseInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

export default BitwiseInput;