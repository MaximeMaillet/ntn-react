import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import OfflineHeader from "../../components/Header/OfflineHeader";
import notificationsActions from "../../redux/notifications/actions";

import './login.scss'
import {FormattedMessage} from "react-intl";

class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false,
  //   };
  // }
  //
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if(!prevProps.loading && this.props.loading) {
  //     this.setState({loading: true});
  //   }
  //
  //   if(prevProps.loading && !this.props.loading) {
  //     if(prevProps.errors) {
  //       this.props.startNotif(this.props.errors);
  //     }
  //
  //     this.setState({loading: false});
  //   }
  // }

  render() {
    const {globalLoading} = this.props;
    return (
      <div className={`parent ${globalLoading ? 'is-loading': ''}`}>
        <OfflineHeader />
        <div className="container-main">
          <section className="main-block block-login">
            <h2><FormattedMessage id="route.login.title" /></h2>
            <LoginForm />
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
  }),
  (dispatch) => ({
    startToaster: (data) => dispatch(notificationsActions.start(data))
  })
)(Login);