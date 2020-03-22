import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route} from "react-router-dom";
import withTorrents from "../../hoc/withTorrents";
import TorrentOne from "../../routes/Torrents/One/TorrentOne";

class TorrentIdContainer extends Component {
  componentDidMount() {
    if(this.props.match.params && this.props.match.params.torrentId) {
      this.props.loadTorrent(this.props.match.params.torrentId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.match.params.torrentId !== this.props.match.params.torrentId) {
      this.props.loadTorrent(this.props.match.params.torrentId);
    }
  }

  render() {
    const {match, torrent} = this.props;
    return (
      <div className={`content`}>
        {
          torrent &&
          <React.Fragment>
            <Route exact path={`${match.url}`}>
              <TorrentOne torrent={torrent}/>
            </Route>
          </React.Fragment>
        }
      </div>
    );
  }
}

TorrentIdContainer.propTypes = {
  profileNotFound: PropTypes.bool,
};

export default withTorrents(TorrentIdContainer);