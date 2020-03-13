import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import {FormattedMessage, injectIntl} from "react-intl";
import notificationsActions from '../../redux/notifications/actions'
import List from "../../components/Torrents/List/List";

class Torrents extends Component {
  render() {
    return (
      <div className="parent">
        <Header />
        <div className="container-side-menu">
          <SideMenu/>
          <div className={`content`}>
            <section className="main-block">
              <h1><FormattedMessage id="route.profile.torrents.h1" /></h1>
              <List user={this.props.user} />
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
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startNotif: (data) => dispatch(notificationsActions.start(data))
  })
)(injectIntl(Torrents)));
