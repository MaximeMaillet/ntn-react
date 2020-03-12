import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import {validate} from "../utils";

class ImageInput extends Component {
  render() {
    return (
      <Field
        name={this.props.name}
        component="input"
        type="file"
        validate={validate()}
      >
        {
          ({ input: { value, onChange, ...input }, meta }) => {
            return (
              <div className="input-file">
                <div className="image">
                  <img src={value} alt="upload" />
                </div>
                <input
                  {...input}
                  id={this.props.name}
                  placeholder={this.props.placeholder}
                  className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
                  onChange={({target}) => {
                    onChange(target.files);
                    this.props.onLoad(target.files);
                  }}
                />


                {
                  (meta.touched && (meta.error || meta.submitError)) &&
                  <div className="invalid-feedback">
                    {meta.error || meta.submitError}
                  </div>
                }
              </div>
            );
          }
        }
      </Field>
    );
  }
}

ImageInput.defaultProps = {
  name: 'image',
  placeholder: 'Image',
  required: false,
};

ImageInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default ImageInput;