import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import OfflineHeader from "../../components/Header/OfflineHeader";
import notificationsActions from "../../redux/notifications/actions";
import {FormattedMessage} from "react-intl";

import './login.scss'

class Login extends Component {
  render() {
    const {globalLoading} = this.props;
    return (
      <div className={`parent ${globalLoading ? 'is-loading': ''}`}>
        <OfflineHeader />
        <div className="container-main">
          <div className="content">
            <section className="d-flex flex-column main-block block-profile-list">
              <h2><FormattedMessage id="route.login.title" /></h2>
              <LoginForm />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    startToaster: (data) => dispatch(notificationsActions.start(data))
  })
)(Login);