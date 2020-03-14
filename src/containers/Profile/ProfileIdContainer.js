import React, {Component} from "react";
import PropTypes from 'prop-types';
import withProfiles from "../../hoc/withProfiles";
import {Route, withRouter} from "react-router-dom";
import ProfileEdit from '../../routes/Profile/Edit/Edit';
import ProfileShow from '../../routes/Profile/Show/Show';
import NotFound from "../../routes/Errors/NotFound/NotFound";
import {injectIntl} from "react-intl";
import {LOADING} from '../../config/const';

class ProfileIdContainerComponent extends Component {
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
      return (
        <div className={`content ${loading !== 0 ? 'is-loading' : ''}`}>
          <NotFound
            title={this.props.intl.messages['profile.errors.not_found.title']}
            message={this.props.intl.messages['profile.errors.not_found.message']}
          />
        </div>
      );
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
                loadTorrents={this.props.loadProfileTorrents}
              />
            </Route>
          </React.Fragment>
        }
      </div>
    );
  }
}

ProfileIdContainerComponent.propTypes = {
  profileNotFound: PropTypes.bool,
};

export default withRouter(withProfiles(injectIntl(ProfileIdContainerComponent)));