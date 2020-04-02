import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import Select from 'react-select';
import {validate} from '../utils';
import {required as requiredValidator} from '../Validators'
import Label from "../Utils/Label";
import Errors from "../Utils/Errors";
import {injectIntl} from "react-intl";

class MediaTypeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };

    this.options = [
      {label: this.props.intl.messages['form.input.media_type.tv'], value: 'tv'},
      {label: this.props.intl.messages['form.input.media_type.movie'], value: 'movie'},
    ];
  };

  handleChange = (selectedOption, onChange) => {
    onChange(this.transformSelected(selectedOption));
    this.setState({selectedOption});
  };

  transformValue = (value) => {
    const option = this.options.filter((o) => o.value === value);
    if(option) {
      return option[0];
    }

    return null;
  };

  transformSelected = (selected) => {
    return selected.value;
  };

  render() {
    const {name, label, required, className} = this.props;
    return (
      <Field
        name={name}
        validate={validate(required ? requiredValidator() : null)}
      >
        {({input, meta}) => {
          return (
            <div className={`form-input input-select ${className}`}>
              <div className={`form-group ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}>
                <Label name={name} label={label} required={required} />
                <Select
                  className={`form-select-control ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}
                  classNamePrefix="form-select-control"
                  id={name}
                  name={name}
                  isMulti={false}
                  required={required}
                  value={this.state.selectedOption ? this.state.selectedOption : this.transformValue(input.value)}
                  onChange={(selectedOption) => this.handleChange(selectedOption, input.onChange)}
                  options={this.options}
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

MediaTypeInput.defaultProps = {
  required: false,
  className: '',
};

MediaTypeInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

export default injectIntl(MediaTypeInput);