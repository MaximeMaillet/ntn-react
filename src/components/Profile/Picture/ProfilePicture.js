import React, {Component} from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';

import defaultProfile from '../../../styles/medias/default_picture.png';
import './profile-picture.scss';

class ProfilePicture extends Component {
  render() {
    return (
      <div className="profile-picture">
        <img src={get(this.props, 'profile.picture', defaultProfile)} alt="profile" />
      </div>
    );
  }
}

ProfilePicture.propTypes = {
  profile: PropTypes.object,
};

export default ProfilePicture;
