import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {LOADING} from "../../config/const";
import ProfileRouter from "../Profile/ProfileRouter";
import TorrentRouter from "../Torrent/TorrentRouter";
import Login from "../../routes/Login/Login";
import NotFound from "../../routes/Errors/NotFound";
import Home from "../../routes/Home/Home";
import {RedirectAs404} from "./RedirectAs404";

class MainRouter extends Component {
  render() {
    const {loading} = this.props;
    return (
      <BrowserRouter>
        <div className={`main-container ${loading & LOADING.LOGIN ? 'is-loading': ''}`}>
          <Switch>
            <Route path="/profiles" component={ProfileRouter}/>
            <Route path="/torrents" component={TorrentRouter} />
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route path="/not-found" component={NotFound} />
            <Route component={RedirectAs404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(MainRouter);