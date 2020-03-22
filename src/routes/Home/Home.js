import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container container-main container-side-menu">
          <div className={`content`}>
            <section className="d-flex flex-row main-block">
            </section>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user.user,
  })
)(withAuth(Home));
