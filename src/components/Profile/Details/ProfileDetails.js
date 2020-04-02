import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProfilePicture from "../../../components/Profile/Picture/ProfilePicture";

import './profile-details.scss'

class ProfileDetails extends Component {
  render() {
    const {profile, className} = this.props;
    return (
      <div className={`profile-details ${className}`}>
        <div className="picture">
          <ProfilePicture
            size="sm"
            profile={profile}
          />
        </div>
        <div className="details">
          {profile.email}<br />
          {profile.roles_str}<br />
          <strong>{profile.space} Go</strong>
        </div>
      </div>
    );
  }
}

ProfileDetails.defaultProps = {
  className: '',
};

ProfileDetails.propTypes = {
  profile: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ProfileDetails;
