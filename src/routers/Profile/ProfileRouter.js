import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";

import ProfileIdRouter from "./ProfileIdRouter";
import ProfileList from '../../routes/Profile/List/List';
import Create from "../../routes/Profile/Create/Create";
import shouldAuth from "../../hoc/shouldAuth";
import SideMenu from "../../components/Menus/SideMenu/SideMenu";

class ProfileRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="content content-side">
          <SideMenu/>
          <Route path={`${match.url}/:userId([0-9]+)`}><ProfileIdRouter /></Route>
          <Route exact path={`${match.url}/create`}><Create /></Route>
          <Route exact path={`${match.url}`}><ProfileList /></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(shouldAuth(ProfileRouter));
