import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import './side-menu.scss';

class SideMenu extends Component {
  render() {
    const {isAdmin, user, position} = this.props;
    return (
      <nav className={`menu-side profile-menu menu-${position}`}>
        {
          isAdmin &&
            <div className="category">
              <div className="title"><FormattedMessage id="side_menu.title.torrents" /></div>
              <div className="links">
                <Link to="/torrents/add"><FormattedMessage id="side_menu.torrents.add" /></Link>
                <Link to="/torrents"><FormattedMessage id="side_menu.torrents.list" /></Link>
              </div>
            </div>
        }
        {
          isAdmin &&
          <div className="category">
            <div className="title"><FormattedMessage id="side_menu.title.users" /></div>
            <div className="links">
              <Link to="/profiles"><FormattedMessage id="side_menu.users.list" /></Link>
            </div>
          </div>
        }
        {
          user &&
          <div className="category">
            <div className="title"><FormattedMessage id="side_menu.title.profile" /></div>
            <div className="links">
              <Link to={`/profiles/${this.props.user.id}`}><FormattedMessage id="side_menu.profile.profile" /></Link>
              <Link to={`/profiles/${this.props.user.id}/edit`}><FormattedMessage id="side_menu.profile.edit" /></Link>
            </div>
          </div>
        }
      </nav>
    );
  }
}

SideMenu.propsType = {
  position: PropTypes.oneOf(['left']),
};

export default connect(
  (state) => ({
    user: state.auth.user,
    isAdmin: state.auth.isAdmin,
  })
)(SideMenu);
