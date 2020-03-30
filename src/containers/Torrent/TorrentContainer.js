import React, {Component} from 'react';
import {Route, withRouter} from "react-router-dom";
import Header from "../../components/Header/Header";
import SideMenu from "../../components/Menus/SideMenu/SideMenu";
import TorrentIdContainer from "./TorrentIdContainer";
import TorrentList from '../../routes/Torrents/List/List';
import TorrentsAdd from '../../routes/Torrents/Add/TorrentsAdd';
import shouldAuth from "../../hoc/shouldAuth";

class TorrentContainer extends Component {
  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Header />
        <Route exact path={`${match.url}(\/?[a-z]*)`}>
          <div className="content content-side">
            <SideMenu/>
            <Route exact path={`${match.url}/add`}><TorrentsAdd /></Route>
            <Route exact path={`${match.url}`}><TorrentList /></Route>
          </div>
        </Route>
        <Route exact path={`${match.url}/:torrentId([0-9]+)`}>
          <TorrentIdContainer/>
        </Route>
      </React.Fragment>
    );
  }
}

export default shouldAuth(withRouter(TorrentContainer));
