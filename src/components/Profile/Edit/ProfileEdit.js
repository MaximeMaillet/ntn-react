import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileDetailForm from "../../../components/Forms/Forms/ProfileForm/ProfileDetailForm";
import ProfilePictureForm from "../../../components/Forms/Forms/ProfileForm/ProfilePictureForm";

class ProfileEdit extends Component {
  render() {
    const {profile} = this.props;
    return (
      <React.Fragment>
        <ProfilePictureForm
          profile={profile}
          onSubmitSuccess={this.props.onSubmitSuccess}
          onSubmitError={this.props.onSubmitError}
        />
        <ProfileDetailForm
          className="form-input-align"
          profile={profile}
          onSubmitSuccess={this.props.onSubmitSuccess}
          onSubmitError={this.props.onSubmitError}
        />
      </React.Fragment>
    );
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileEdit;