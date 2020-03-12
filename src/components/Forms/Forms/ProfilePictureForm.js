import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import api from '../../../libraries/api';
import userActions from '../../../redux/users/actions';
import ImageInput from "../Inputs/ImageInput";

import '../forms.scss';

class ProfilePictureForm extends Component {

  onSubmit = async(data) => {
    try {
      this.props.startLoading();

      if(!data || !data.picture || !data.picture[0]) {
        return {picture: <FormattedMessage id="form.input.file.required" />}
      }

      const payload = new FormData();
      payload.append('picture', data.picture[0], data.picture[0].name);
      const user = (await api('PATCH', `/users/${this.props.user.id}/picture`, payload, {'Content-Type': ''})).data;
      this.props.loaded('update', user);
    } catch(e) {
      console.warn(e);
      this.props.fail(e);
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
    } finally {
      this.props.stopLoading();
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={{
          picture: this.props.user.picture,
        }}
      >
        {props => (
          <form id="profile-picture-form" className={`main-form ${this.props.className}`} onSubmit={props.handleSubmit} noValidate>
            <ImageInput
              name="picture"
              onLoad={() => props.form.submit()}
            />
          </form>
        )}
      </Form>
    );
  }
}

ProfilePictureForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    startLoading: () => dispatch(userActions.startLoading()),
    stopLoading: () => dispatch(userActions.stopLoading()),
    fail: (e) => dispatch(userActions.fail(e)),
    loaded: (action, user) => dispatch(userActions.loaded(action, user)),
  })
)
(injectIntl(ProfilePictureForm));