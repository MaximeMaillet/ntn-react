import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from "react-final-form";
import {extensions} from '../Validators'
import {validate} from '../utils'
import Errors from "../Utils/Errors";
import {required as requiredValidator} from '../Validators'

class FileInput extends Component {
  render() {
    const {accept, name, required, multiple} = this.props;
    return (
      <Field
        name={name}
        component="input"
        type="file"
        validate={validate(extensions(accept), required ? requiredValidator() : null)}
      >
        {
          ({ input: { value, onChange, ...input }, meta }) => {
            return (
              <div className={`form-input input-file ${this.props.className}`}>
                <div className={`form-group ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                  <div className={`form-file ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}>
                    {value && value[0] ? <div className="file-name" title={value[0].name}><i className="fas fa-file-upload" /></div> : ''}
                    <input
                      {...input}
                      id={name}
                      multiple={multiple}
                      accept={accept.join(', ')}
                      placeholder={this.props.placeholder}
                      className={`form-control ${meta.touched && (meta.valid ? 'is-valid' : 'is-invalid')}`}
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

FileInput.defaultProps = {
  className: '',
  required: false,
  multiple: false,
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  accept: PropTypes.array.isRequired,
  onLoaded: PropTypes.func,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default FileInput;