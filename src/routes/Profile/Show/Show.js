import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import ProfilePicture from "../../../components/Profile/Picture/ProfilePicture";
import TorrentList from '../../../components/Torrents/List/List';

import './show.scss'

class Show extends Component {
  componentDidMount() {
    this.props.loadTorrents();
  }

  render() {
    const {profile, loading, torrents, isAdmin} = this.props;
    return (
      <section className="main-block block-content block-profile-show">
        <h1><FormattedMessage id="route.profile.show.h1" /></h1>

        <div className="d-flex flex-row profile-content">
          <div className="d-flex flex-column picture-details">
            <div className="d-flex flex-row">
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
            <div className="d-flex align-items-center justify-content-center flex-grow-1">
              {
                isAdmin ?
                  <Link className="btn btn-primary" to={`/profile/${profile.id}/edit`}>
                    <FormattedMessage id="route.profile.show.edit_button" />
                  </Link>
                  :
                  ''
              }
            </div>
          </div>
          <div className="torrents">
            <TorrentList
              loading={loading}
              torrents={torrents}
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
  isAdmin: PropTypes.bool,
};

export default connect(
  (state) => ({
    isAdmin: state.user.isAdmin,
  })
)(Show);
