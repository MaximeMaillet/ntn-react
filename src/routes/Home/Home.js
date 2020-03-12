import React, {Component} from 'react';
import LoginForm from "../../components/Forms/Forms/LoginForm";
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";

class Home extends Component {
  render() {
    return (
      <div className="container-content">
        <Header />
        <LoginForm/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.user,
  })
)(withAuth(Home));
