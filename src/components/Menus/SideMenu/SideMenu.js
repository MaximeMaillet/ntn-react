import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import './side-menu.scss';

class SideMenu extends Component {

  render() {
    return (
      <nav className="menu profile-menu menu-left">
        {
          this.props.isAdmin &&
          <div className="category">
            <div className="title"><FormattedMessage id="side_menu.title.users" /></div>
            <div className="links">
              <Link to="/admin/users"><FormattedMessage id="side_menu.users.list" /></Link>
            </div>
          </div>
        }
        <div className="category">
          <div className="title"><FormattedMessage id="side_menu.title.profile" /></div>
          <div className="links">
            <Link to="/profile"><FormattedMessage id="side_menu.profile.details" /></Link>
            <Link to="/torrents"><FormattedMessage id="side_menu.profile.torrents" /></Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  (state) => ({
    isAdmin: state.user.isAdmin,
  })
)(SideMenu);
