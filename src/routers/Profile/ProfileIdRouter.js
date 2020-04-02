import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import ProfileEdit from '../../routes/Profile/Edit/Edit';
import ProfileShow from '../../routes/Profile/Show/Show';

class ProfileIdRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Route exact path={`${match.url}/edit`}>
          <ProfileEdit profileId={parseInt(match.params.profileId)} />
        </Route>
        <Route exact path={`${match.url}`}>
          <ProfileShow profileId={parseInt(match.params.profileId)} />
        </Route>
      </React.Fragment>
    );
  }
}

ProfileIdRouter.propTypes = {
  profileNotFound: PropTypes.bool,
};

export default withRouter(ProfileIdRouter);