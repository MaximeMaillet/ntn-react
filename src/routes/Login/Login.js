import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import OfflineHeader from "../../components/Header/OfflineHeader";
import {FormattedMessage} from "react-intl";

import './login.scss'

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <OfflineHeader />
        <div className="content content-simple">
          <section className="main-block block-login">
            <h2><FormattedMessage id="route.login.title" /></h2>
            <LoginForm />
          </section>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
)(Login);