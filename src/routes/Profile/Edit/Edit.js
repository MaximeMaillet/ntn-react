import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage, injectIntl} from "react-intl";
import ProfileDetailForm from "../../../components/Forms/Forms/ProfileForm/ProfileDetailForm";
import ProfilePictureForm from "../../../components/Forms/Forms/ProfileForm/ProfilePictureForm";
import notificationActions from '../../../redux/notifications/actions';
import shouldAuth from "../../../hoc/shouldAuth";

class Edit extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.error && this.props.error) {
      this.props.startToaster(this.props.error);
    }
  }

  onSubmit = (profile) => {
    this.props.refresh(profile);
    this.props.startToaster({message: this.props.intl.messages['form.generic.update.success']})
  };

  render() {
    const {profile} = this.props;
    return (
      <section className="main-block block-content block-profile-edit">
        <h1><FormattedMessage id="route.profile.edit.h1" /></h1>
        <ProfilePictureForm
          startLoading={this.props.startLoading}
          stopLoading={this.props.stopLoading}
          profile={profile}
          onSubmit={this.onSubmit}
          onError={this.props.handleError}
        />
        <ProfileDetailForm
          className="form-input-align"
          startLoading={this.props.startLoading}
          stopLoading={this.props.stopLoading}
          profile={profile}
          onSubmit={this.onSubmit}
          onError={this.props.handleError}
        />
      </section>
    );
  }
}

Edit.propTypes = {
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  profile: PropTypes.object,
  error: PropTypes.object,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    startToaster: (message) => dispatch(notificationActions.start(message)),
  })
)(injectIntl(Edit));