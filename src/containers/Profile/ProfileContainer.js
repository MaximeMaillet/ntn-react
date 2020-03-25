import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";

import ProfileList from '../../routes/Profile/List/List';
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import ProfileIdContainer from "./ProfileIdContainer";
import Create from "../../routes/Profile/Create/Create";

class ProfileContainer extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="container-main container-side-menu">
          <SideMenu/>
          <Route path={`${match.url}/:userId([0-9]+)`}><ProfileIdContainer /></Route>
          <Route exact path={`${match.url}/create`}><Create /></Route>
          <Route exact path={`${match.url}`}><ProfileList /></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(ProfileContainer);
