import React, {Component} from 'react';
import PropTypes from 'prop-types';

import defaultProfile from '../../../styles/medias/default_picture.png';
import './profile-picture.scss';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: defaultProfile,
    }
  }
  static getDerivedStateFromProps(props) {
    if(!props.profile || !props.profile.picture) {
      return {picture: defaultProfile};
    }

    return {picture: props.profile.picture};
  }

  render() {
    const {size, className} = this.props;
    return (
      <div
        className={`profile-picture ${size} ${className}`}
        style={{
          backgroundImage: `url("${this.state.picture}")`
        }}
      >
      </div>
    );
  }
}

ProfilePicture.defaultProps = {
  className: '',
  size: 'xs',
};

ProfilePicture.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object,
  size: PropTypes.oneOf(['xs', 'sm', 'xl']),
};

export default ProfilePicture;
