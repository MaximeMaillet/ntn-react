import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router-dom";
import moment from 'moment';
import Octet from "../../Octet/Octet";
import ProfilePicture from "../Picture/ProfilePicture";

import './list.scss';

class ProfileTable extends Component {
  clickItem = (profile) => {
    this.props.history.push(`/profiles/${profile.id}`);
  };

  render() {
    const {profiles, className} = this.props;
    return (
      <div className={`main-table main-table-primary table-profiles ${className}`}>
        <div className="row main-table-row main-table-header">
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item picture"><FormattedMessage id="profile.list.item.title.picture" /></div>
          <div className="col-0 col-sm-0 col-lg-1 col-xl-1 main-table-item id"><FormattedMessage id="profile.list.item.title.id" /></div>
          <div className="col-4 col-sm-4 col-lg-4 col-xl-3 main-table-item email"><FormattedMessage id="profile.list.item.title.email" /></div>
          <div className="col-3 col-sm-3 col-lg-2 col-xl-2 main-table-item roles"><FormattedMessage id="profile.list.item.title.roles" /></div>
          <div className="col-4 col-sm-2 col-lg-1 col-xl-1 main-table-item space"><FormattedMessage id="profile.list.item.title.space" /></div>
          <div className="col-0 col-sm-2 col-lg-3 col-xl-2 main-table-item created"><FormattedMessage id="profile.list.item.title.created" /></div>
          <div className="col-0 col-sm-0 col-lg-0 col-xl-2 main-table-item updated"><FormattedMessage id="profile.list.item.title.updated" /></div>
        </div>
        {
          profiles.map((profile, key) => {
            return (
              <div className="row main-table-row row-clickable" key={key} onClick={() => this.clickItem(profile)}>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item picture">
                  <ProfilePicture
                    className={profile.is_validated ? 'is-validated' : 'is-invalidated'}
                    indicator={profile.is_validated ? <i className="fa fa-check" /> : <i className="fa fa-times" /> }
                    profile={profile} />
                </div>
                <div className="col-0 col-sm-0 col-lg-1 col-xl-1 main-table-item id">{profile.id}</div>
                <div className="col-4 col-sm-4 col-lg-4 col-xl-3 main-table-item email"><span>{profile.email}</span></div>
                <div className="col-3 col-sm-3 col-lg-2 col-xl-2 main-table-item roles"><span>{profile.roles_str}</span></div>
                <div className="col-4 col-sm-2 col-lg-1 col-xl-1 main-table-item space"><Octet value={profile.space}/></div>
                <div className="col-0 col-sm-2 col-lg-3 col-xl-2 main-table-item created"><span>{moment(profile.createdAt).format('DD/MM/YYYY HH:mm')}</span></div>
                <div className="col-0 col-sm-0 col-lg-0 col-xl-2 main-table-item updated">{moment(profile.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

ProfileTable.defaultProps = {
  className: '',
};


ProfileTable.propTypes = {
  className: PropTypes.string,
  profiles: PropTypes.array,
};

export default withRouter(ProfileTable);
