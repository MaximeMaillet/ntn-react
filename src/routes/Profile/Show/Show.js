import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import shouldAuth from "../../../hoc/shouldAuth";
import TorrentContainer, {TYPE as TorrentContainerType} from "../../../containers/torrents/TorrentContainer";
import ProfileContainer, {TYPE as ProfileContainerType} from "../../../containers/profile/ProfileContainer";
import TorrentsTable from '../../../components/Torrents/Table/TorrentsTable';
import ProfileDetails from "../../../components/Profile/Details/ProfileDetails";

import './show.scss'

class Show extends Component {
  render() {
    const {profileId, isAdmin, user} = this.props;
    return (
      <section className="main-block block-side block-content block-profile-show">
        <div className="d-flex flex-row">
          <h1><FormattedMessage id="route.profile.show.h1" /></h1>
          {
            (isAdmin || user.id === profileId) ?
              <Link className="btn btn-primary ml-auto" to={`/profiles/${profileId}/edit`}>
                <i className="fa fa-edit" />
                <FormattedMessage id="route.profile.show.edit_button" />
              </Link>
              :
              ''
          }
        </div>

        <div className="profile-content">
          <div className="picture-details">
            <ProfileContainer
              type={ProfileContainerType.ONE}
              profile_id={profileId}
              component={ProfileDetails}
            />
          </div>
          <div className="torrents">
            <TorrentContainer
              type={TorrentContainerType.USER}
              profile_id={parseInt(profileId)}
              component={TorrentsTable}
            />
          </div>
        </div>
      </section>
    );
  }
}

Show.propTypes = {
  profileId: PropTypes.number.isRequired,
  user: PropTypes.object,
  isAdmin: PropTypes.bool,
};

export default shouldAuth(connect(
  (state) => ({
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
  })
)(Show));
