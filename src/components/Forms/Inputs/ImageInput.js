import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import {validate} from "../utils";
import Errors from "../Utils/Errors";
import {extensions, maxFileSize} from '../Validators'

class ImageInput extends Component {
  render() {
    const {name, accept, multiple, placeholder} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="file"
        validate={validate(extensions(this.props.accept), maxFileSize(this.props.maxSize))}
      >
        {
          ({ input: { value, onChange, ...input }, meta }) => {
            return (
              <div className={`form-input input-image ${this.props.className}`}>
                <div className={`form-group ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}>
                  <div
                    className={`form-file ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}
                    style={{backgroundImage: `url("${value ? (typeof value === 'string' && value.startsWith('http') ? value : URL.createObjectURL(value[0])) : null}")`}}
                  >
                    <input
                      {...input}
                      id={name}
                      multiple={multiple}
                      accept={accept.join(', ')}
                      placeholder={placeholder}
                      className={`form-control ${meta.touched ? (meta.valid ? 'is-valid' : 'is-invalid') : ''}`}
                      onChange={({target}) => {
                        onChange(target.files);
                        if(this.props.onLoaded) {
                          this.props.onLoaded(target.files);
                        }
                      }}
                    />
                  </div>
                </div>
                <Errors meta={meta}/>
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
  multiple: false,
  required: false,
  maxSize: 100*1024,
};

ImageInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  accept: PropTypes.array.isRequired,
  onLoaded: PropTypes.func,
};

export default ImageInput;