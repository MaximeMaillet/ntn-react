import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ProfilePicture from "../Profile/Picture/ProfilePicture";
import userActions from '../../redux/users/actions';

import logo from '../../styles/medias/logo.svg'
import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="global-header">
        <div className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className="titles">
          <h2>NTN</h2>
          <h3>Download & upload</h3>
        </div>
        <div className="profile">
          <Link to="/profile" className="d-flex flex-row align-items-center justify-content-center">
            <div className="email">
              {this.props.user.email}<br />
              <FormattedMessage id="header.profile.quota" /> <strong>{this.props.user.space}</strong> Go
            </div>
            <ProfilePicture profile={this.props.user} />
            <button className="ml-2 btn btn-secondary" onClick={this.props.logout}>
              <i className="fas fa-sign-out-alt"/>
            </button>
          </Link>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.user,
  }),
  (dispatch) => ({
    logout: () => dispatch(userActions.logout()),
  })
)(Header);
