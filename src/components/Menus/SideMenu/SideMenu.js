import React, {Component} from 'react';

import './side-menu.scss';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

class SideMenu extends Component {

  render() {
    return (
      <nav className="menu profile-menu menu-left">
        <div className="category">
          <div className="title"><FormattedMessage id="side_menu.title.profile" /></div>
          <div className="links">
            <Link to="/profile"><FormattedMessage id="side_menu.profile.details" /></Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideMenu;
