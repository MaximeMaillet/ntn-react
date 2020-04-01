import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import TorrentContainer, {TYPE} from "../../containers/torrents/TorrentContainer";
import TorrentOne from "../../routes/Torrents/One/TorrentOne";

class TorrentIdRouter extends Component {
  render() {
    const {match} = this.props;
    return (
      <div className="content container-fluid">
        <section className="main-block">
          <Route exact path={`${match.url}`}>
            <TorrentContainer
              type={TYPE.ONE}
              torrent_id={parseInt(match.params.torrentId)}
              component={TorrentOne}
            />
          </Route>
        </section>
      </div>
    );
  }
}

TorrentIdRouter.propTypes = {
  match: PropTypes.object,
};

export default withRouter(TorrentIdRouter);