import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

class Home extends Component {
  render() {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <Header />
        <div className="container-main">
          <section className="d-flex flex-row main-block">
            <div className="actions ml-auto">
              <Link className="btn btn-primary" to="/torrents/add">
                <FormattedMessage id="route.home.actions.add" />
              </Link>
            </div>
            <video id="videoPlayer" controls>
              <source src={`${process.env.REACT_APP_API_URL}/stream`} type="video/mp4" />
            </video>
          </section>
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
