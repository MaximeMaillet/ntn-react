import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import TorrentList from '../../routes/Torrents/List/List';
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import TorrentIdContainer from "./TorrentIdContainer";

class TorrentContainer extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Header />
        <div className="container-main container-side-menu">
          <SideMenu/>
          <Route path={`${match.url}/:torrentId`}><TorrentIdContainer/></Route>
          <Route exact path={`${match.url}`}><TorrentList /></Route>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(TorrentContainer);