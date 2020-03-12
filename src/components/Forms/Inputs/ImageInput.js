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
              <div className="form-group form-input-file">
                <div className={`image ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`} style={{backgroundImage: `url("${value}")`}}>
                  <input
                    {...input}
                    id={this.props.name}
                    accept="image/jpg, image/jpeg, image/png"
                    placeholder={this.props.placeholder}
                    className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
                    onChange={({target}) => {
                      onChange(target.files);
                      this.props.onLoad(target.files);
                    }}
                  />
                </div>
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