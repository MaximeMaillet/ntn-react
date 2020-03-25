import React, {Component} from 'react';
import {connect} from "react-redux";
import withAuth from "../../hoc/withAuth";
import Header from "../../components/Header/Header";
import TorrentList from '../Torrents/List/List';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container container-main container-side-menu">
          <div className={`content`}>
            <TorrentList />
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
