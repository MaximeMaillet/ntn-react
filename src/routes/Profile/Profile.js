import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import {FormattedMessage} from "react-intl";
import ProfileDetailForm from "../../components/Forms/Forms/ProfileDetailForm";
import ProfilePictureForm from "../../components/Forms/Forms/ProfilePictureForm";

class Profile extends Component {
  render() {
    return (
      <div className="parent">
        <Header />
        <div className="container-side-menu">
          <SideMenu/>
          <div className="content">
            <section className="main-block">
              <h1><FormattedMessage id="route.profile.details.h1" /></h1>
              <ProfilePictureForm
                user={this.props.user}
              />
              <ProfileDetailForm
                user={this.props.user}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(connect(
  (state) => ({
    user: state.user.user,
    loading: state.user.loading,
  })
)(Profile));
