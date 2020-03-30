import React, {Component} from 'react';
import {Route} from "react-router-dom";
import Home from "../../routes/Home/Home";
// import ProfileContainer from "../Profile/ProfileContainer";
import TorrentContainer from "../Torrent/TorrentContainer";
import {connect} from "react-redux";
import {LOADING} from "../../config/const";
import Login from "../../routes/Login/Login";

class MainContainer extends Component {
  render() {
    const {loading} = this.props;
    return (
      <React.Fragment>
        <Route exact path="/login"><Login/></Route>
        <div className={`main-container ${loading & LOADING.LOGIN ? 'is-loading': ''}`}>
          {/*<Route path="/profiles"><ProfileContainer /></Route>*/}
          <Route path="/torrents"><TorrentContainer /></Route>
          <Route exact path="/"><Home/></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(MainContainer);