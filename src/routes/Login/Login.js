import React, {Component} from 'react';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import OfflineHeader from "../../components/Header/OfflineHeader";

class Login extends Component {
  render() {
    return (
      <div className="parent">
        <OfflineHeader />
        <div className="container">
          <section className="main-block">
          <LoginForm />
          </section>
        </div>
      </div>
    );
  }
}

export default Login;