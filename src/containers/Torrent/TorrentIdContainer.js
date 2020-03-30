import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Route, withRouter} from "react-router-dom";
import withTorrents from "../../hoc/withTorrents";
import TorrentOne from "../../routes/Torrents/One/TorrentOne";
import {LOADING} from "../../config/const";
import {connect} from "react-redux";

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
    const {match, torrent, loading} = this.props;
    return (
      <div className="content container-fluid">
        <section className={`main-block ${(loading & LOADING.TORRENTS) ? 'is-loading' : ''}`}>
          {
            torrent &&
              <React.Fragment>
                <Route exact path={`${match.url}`}>
                  <TorrentOne torrent={torrent}/>
                </Route>
              </React.Fragment>
          }
        </section>
      </div>
    );
  }
}

TorrentIdContainer.propTypes = {
  profileNotFound: PropTypes.bool,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(withRouter(withTorrents(TorrentIdContainer)));