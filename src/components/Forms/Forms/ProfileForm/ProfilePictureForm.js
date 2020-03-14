import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import {FormattedMessage, injectIntl} from "react-intl";
import api from '../../../../libraries/api';
import get from 'lodash.get';
import ImageInput from "../../Inputs/ImageInput";

import '../../forms.scss';

class ProfilePictureForm extends Component {
  onSubmit = async(data) => {
    try {
      this.props.startLoading();
      if(!data || !data.picture || !data.picture[0]) {
        return {picture: <FormattedMessage id="form.input.file.required" />}
      }

      const payload = new FormData();
      payload.append('picture', data.picture[0], data.picture[0].name);
      const user = (await api('PATCH', `/users/${this.props.profile.id}/picture`, payload, {'Content-Type': ''})).data;
      this.props.onSubmit(user);
    } catch(e) {
      if(this.props.onError) {
        this.props.onError(e);
      }
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading();
    }
  };

  render() {
    const { className, profile } = this.props;
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          picture: get(profile, 'picture', null),
        }}
      >
        {props => (
          <form className={`form-main ${className}`} onSubmit={props.handleSubmit} noValidate>
            <ImageInput
              name="picture"
              className="form-input-align"
              accept={['image/jpg', 'image/jpeg', 'image/png']}
              maxSize={100*1024}
              onLoaded={() => props.form.submit()}
            />
          </form>
        )}
      </Form>
    );
  }
}

ProfilePictureForm.defaultProps = {
  className: '',
  profile: null,
};

ProfilePictureForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  onError: PropTypes.func,
  profile: PropTypes.object,
  className: PropTypes.string,
};

export default injectIntl(ProfilePictureForm);