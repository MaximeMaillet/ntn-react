import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import TorrentContainer, {TYPE} from "../../containers/torrents/TorrentContainer";
import TorrentOne from "../../routes/Torrents/One/TorrentOne";
import TorrentEdit from "../../routes/Torrents/Edit/TorrentEdit";

class TorrentIdRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <div className="content container-fluid">
        <Route exact path={`${match.url}/edit`}>
          <TorrentContainer
            type={TYPE.ONE}
            torrent_id={parseInt(match.params.torrentId)}
            component={TorrentEdit}
          />
        </Route>
        <Route exact path={`${match.url}`}>
          <TorrentContainer
            type={TYPE.ONE}
            torrent_id={parseInt(match.params.torrentId)}
            component={TorrentOne}
          />
        </Route>
      </div>
    );
  }
}

TorrentIdRouter.propTypes = {
  match: PropTypes.object,
};

export default withRouter(TorrentIdRouter);