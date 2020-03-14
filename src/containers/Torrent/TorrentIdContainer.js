import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import {LOADING} from '../../config/const';
import withTorrents from "../../hoc/withTorrents";
import Stream from "../../routes/Stream/Stream";

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
    const {match, loading, torrent} = this.props;
    return (
      <div className={`content`}>
        {
          torrent &&
          <React.Fragment>
            <Route exact path={`${match.url}/files`}>
              <Stream torrent={torrent} />
            </Route>
            <Route exact path={`${match.url}`}>
              One torrent {torrent.name}
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

export default withRouter(withTorrents(TorrentIdContainer));