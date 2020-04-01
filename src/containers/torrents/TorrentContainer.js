import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTorrents from "../../hoc/withTorrents";
import {connect} from "react-redux";
import {LOADING} from "../../config/const";
import TorrentLoading from "../../components/Torrents/Loading/TorrentLoading";
import TorrentError from "../../components/Torrents/Errors/TorrentError";
import TorrentEmpty from "../../components/Torrents/Empty/TorrentEmpty";

export const TYPE = {
  ALL: 1,
  USER: 2,
  ONE: 3
};

class TorrentContainer extends Component {
  componentDidMount() {
    if(this.props.type === TYPE.ALL) {
      this.props.loadTorrents();
    } else if(this.props.type === TYPE.USER) {
      if(!this.props.profile_id) {
        throw new Error('You should precise profile id');
      }
      this.props.loadTorrentUser(this.props.profile_id);
    } else if(this.props.type === TYPE.ONE) {
      if(!this.props.torrent_id) {
        throw new Error('You should precise torrent id');
      }

      this.props.loadTorrent(this.props.torrent_id);
    }
  }

  render() {
    const {torrent, type, torrents, torrentError, loading, component, className} = this.props;

    if(loading & LOADING.TORRENTS) {
      return <TorrentLoading className={className} />;
    }

    if(torrentError) {
      return <TorrentError className={className} message={torrentError.message} />;
    }

    if(
      (type === TYPE.ALL || type === TYPE.USER) && (!torrents || torrents.length === 0) ||
      (type === TYPE.ONE && !torrent)
    ) {
      return <TorrentEmpty className={className} />;
    }

    return React.createElement(
      component,
      {
        className,
        torrents,
        torrent,
        pauseTorrent: this.props.pauseTorrent,
        resumeTorrent: this.props.resumeTorrent,
        removeTorrent: this.props.removeTorrent,
      }
    );
  }
}

TorrentContainer.defaultProps = {
  className: '',
};

TorrentContainer.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  torrent_id: PropTypes.number,
  profile_id: PropTypes.number,
  type: PropTypes.oneOf(Object.values(TYPE)).isRequired,
  torrents: PropTypes.array,
  torrent: PropTypes.object,
  torrentError: PropTypes.object,
  loading: PropTypes.number,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(withTorrents(TorrentContainer));
