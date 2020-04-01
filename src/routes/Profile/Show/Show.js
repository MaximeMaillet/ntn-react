import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ProfilePicture from "../../../components/Profile/Picture/ProfilePicture";
import TorrentsTable from '../../../components/Torrents/Table/TorrentsTable';
import TorrentContainer, {TYPE} from "../../../containers/torrents/TorrentContainer";

import './show.scss'

class Show extends Component {
  render() {
    const {profile, isAdmin, user} = this.props;
    return (
      <section className="main-block block-side block-content block-profile-show">
        <div className="d-flex flex-row">
          <h1><FormattedMessage id="route.profile.show.h1" /></h1>
          {
            (isAdmin || user.id === profile.id) ?
              <Link className="btn btn-primary ml-auto" to={`/profiles/${profile.id}/edit`}>
                <i className="fa fa-edit" />
                <FormattedMessage id="route.profile.show.edit_button" />
              </Link>
              :
              ''
          }
        </div>

        <div className="profile-content">
          <div className="picture-details">
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
          <div className="torrents">
            <TorrentContainer
              type={TYPE.USER}
              profile_id={parseInt(profile.id)}
              component={TorrentsTable}
            />
          </div>
        </div>
      </section>
    );
  }
}

Show.propTypes = {
  loading: PropTypes.number,
  LOADING_TYPE: PropTypes.object,
  profile: PropTypes.object.isRequired,
  user: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export default connect(
  (state) => ({
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
  })
)(Show);
