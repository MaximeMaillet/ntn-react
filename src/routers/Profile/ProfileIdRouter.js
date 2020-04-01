import React, {Component} from "react";
import PropTypes from 'prop-types';
import {injectIntl} from "react-intl";
import {Route, withRouter} from "react-router-dom";
import {LOADING} from '../../config/const';
import ProfileEdit from '../../routes/Profile/Edit/Edit';
import ProfileShow from '../../routes/Profile/Show/Show';
import withProfiles from "../../hoc/withProfiles";
import {RedirectAs404} from '../Main/RedirectAs404';

class ProfileIdRouter extends Component {
  componentDidMount() {
    if(this.props.match.params && this.props.match.params.userId) {
      this.props.loadProfile(this.props.match.params.userId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.match.params.userId !== this.props.match.params.userId) {
      this.props.loadProfile(this.props.match.params.userId);
    }
  }

  render() {
    const {match, loading, profile, profileTorrents, profileNotFound} = this.props;
    if(profileNotFound) {
      return <RedirectAs404
        title={this.props.intl.messages['route.errors.profile.not_found.title']}
        text={this.props.intl.messages['route.errors.profile.not_found.text']}
      />;
    }

    return (
      <div className={`content ${(loading & LOADING.PROFILE) !== 0 ? 'is-loading' : ''}`}>
        {
          profile &&
          <React.Fragment>
            <Route exact path={`${match.url}/edit`}>
              <ProfileEdit
                profile={profile}
                error={this.props.profileError}
                startLoading={this.props.startLoading}
                stopLoading={this.props.stopLoading}
                refresh={this.props.refresh}
                handleError={this.props.handleError}
              />
            </Route>
            <Route exact path={`${match.url}`}>
              <ProfileShow
                profile={profile}
                torrents={profileTorrents}
                loading={loading}
              />
            </Route>
          </React.Fragment>
        }
      </div>
    );
  }
}

ProfileIdRouter.propTypes = {
  profileNotFound: PropTypes.bool,
};

export default withRouter(withProfiles(injectIntl(ProfileIdRouter)));