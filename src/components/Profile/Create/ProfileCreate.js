import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfileDetailForm from "../../../components/Forms/Forms/ProfileForm/ProfileDetailForm";

class ProfileCreate extends Component {
  render() {
    const {profile} = this.props;
    return (
      <ProfileDetailForm
        className="form-input-align"
        profile={profile}
        onSubmitSuccess={this.props.onSubmitSuccess}
        onSubmitError={this.props.onSubmitError}
      />
    );
  }
}

ProfileCreate.propTypes = {
  profile: PropTypes.object,
};

export default ProfileCreate;