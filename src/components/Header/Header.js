import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ProfilePicture from "../Profile/Picture/ProfilePicture";
import get from 'lodash.get';
import authActions from "../../redux/auth/actions";

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
          <h3>Download, Upload, Stream</h3>
        </div>
        <div className="profile">
          <Link to={`/profiles/${get(this.props, 'user.id', 0)}`} className="d-flex flex-row align-items-center justify-content-center">
            <ProfilePicture className="header-profile" profile={get(this.props, 'user', null)} />
          </Link>
          <button className="ml-2 btn btn-secondary" onClick={this.props.logout}>
            <i className="fas fa-sign-out-alt"/>
          </button>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({
    user: state.auth.user,
  }),
  (dispatch) => ({
    logout: () => dispatch(authActions.logout()),
  })
)(Header);
