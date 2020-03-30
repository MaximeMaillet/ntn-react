import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import shouldAuth from "../../../hoc/withAuth";
import loadingActions from '../../../redux/loading/actions';
import {FormattedMessage, injectIntl} from "react-intl";
import notificationsActions from "../../../redux/notifications/actions";
import ProfilePicture from "../Picture/ProfilePicture";
import moment from 'moment';

import './list.scss';
import {withRouter} from "react-router-dom";

class ProfileList extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.profileError && this.props.profileError) {
      this.props.startToaster(this.props.profileError);
    }
  }

  clickItem = (profile) => {
    this.props.history.push(`/profiles/${profile.id}`);
  };

  render() {
    const {loading, profiles} = this.props;
    return (
      <div className={`list-main list-profile ${loading ? 'is-loading': ''}`}>
        <div className="title-item profile-title-item">
          <div className="item picture"><FormattedMessage id="profile.list.item.title.picture" /></div>
          <div className="item id"><FormattedMessage id="profile.list.item.title.id" /></div>
          <div className="item email"><FormattedMessage id="profile.list.item.title.email" /></div>
          <div className="item roles"><FormattedMessage id="profile.list.item.title.roles" /></div>
          <div className="item space"><FormattedMessage id="profile.list.item.title.space" /></div>
          <div className="item validated"><FormattedMessage id="profile.list.item.title.validated" /></div>
          <div className="item created"><FormattedMessage id="profile.list.item.title.created" /></div>
          <div className="item updated"><FormattedMessage id="profile.list.item.title.updated" /></div>
        </div>
        {profiles && profiles.map((profile, key) => {
          return (
            <div className="content-item item-clicked profile-item" key={key} onClick={() => this.clickItem(profile)}>
              <div className="item picture">
                <ProfilePicture profile={profile} />
              </div>
              <div className="item id">{profile.id}</div>
              <div className="item email">{profile.email}</div>
              <div className="item roles">{profile.roles_str}</div>
              <div className="item space">{profile.space} Go</div>
              <div className={`item validated ${profile.is_validated ? 'is-validated' : 'is-invalidated'}`}>
                {profile.is_validated ? <i className="fa fa-check" /> : <i className="fa fa-times" /> }
              </div>
              <div className="item created">{moment(profile.createdAt).format('DD/MM/YYYY HH:mm')}</div>
              <div className="item updated">{moment(profile.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
            </div>
          );
        })}
        {
          (!profiles || profiles.length === 0) &&
          <div className="content-item no-item"><FormattedMessage id="profile.list.no_item" /></div>
        }
      </div>
    );
  }
}

ProfileList.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  torrentError: PropTypes.object,
  startToaster: PropTypes.func,
  profiles: PropTypes.array,
  profileError: PropTypes.object,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
    startToaster: (data) => dispatch(notificationsActions.start(data)),
  })
)(withRouter(shouldAuth(injectIntl(ProfileList))));
