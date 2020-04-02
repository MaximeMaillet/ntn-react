import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import {FormattedMessage, injectIntl} from "react-intl";
import api from '../../../../libraries/api';
import get from 'lodash.get';
import ImageInput from "../../Inputs/ImageInput";

import '../../forms.scss';
import {LOADING} from "../../../../config/const";
import {connect} from "react-redux";
import loadingActions from "../../../../redux/loading/actions";

class ProfilePictureForm extends Component {
  onSubmit = async(data) => {
    try {
      this.props.startLoading(LOADING.FORM_PROFILE);
      if(!data || !data.picture || !data.picture[0]) {
        return {picture: <FormattedMessage id="form.input.file.required" />}
      }

      const payload = new FormData();
      payload.append('picture', data.picture[0], data.picture[0].name);
      const user = (await api('PATCH', `/users/${this.props.profile.id}/picture`, payload, {'Content-Type': ''})).data;
      this.props.onSubmitSuccess(user);
    } catch(e) {
      this.props.onSubmitError(e);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading(LOADING.FORM_PROFILE);
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
  onSubmitError: (e) => console.warn(e),
  onSubmitSuccess: (data) => console.log(data),
};

ProfilePictureForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)(injectIntl(ProfilePictureForm));