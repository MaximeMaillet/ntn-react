import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from "react-final-form";
import EmailInput from "../Inputs/EmailInput";
import {connect} from "react-redux";
import {FormattedMessage, injectIntl} from "react-intl";
import PasswordInput from "../Inputs/PasswordInput";
import userActions from '../../../redux/users/actions';
import api from '../../../libraries/api';

import '../forms.scss';
import ImageInput from "../Inputs/ImageInput";

class ProfilePictureForm extends Component {

  onSubmit = (data) => {

  };

  onLoad = async(files) => {
    try {
      const payload = new FormData();
      payload.append('picture', files[0], files[0].name);
      await this.props.updatePicture(this.props.user.id, payload);
    } catch(e) {
      console.warn(e);
      // popup
      if(e.data && e.data.fields) {
        return e.data.fields;
      }
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
        {props =>
          <form className="main-form" onSubmit={props.handleSubmit} noValidate>
            <ImageInput
              name="picture"
              onLoad={this.onLoad}
            />
          </form>
        }
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
    updatePicture: (userId, picture) => dispatch(userActions.updatePicture(userId, picture))
  })
)
(injectIntl(ProfilePictureForm));