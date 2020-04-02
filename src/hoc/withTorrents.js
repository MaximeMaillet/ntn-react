import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import loadingActions from "../redux/loading/actions";
import api from '../libraries/api';
import {LOADING} from '../config/const';

export default function withTorrents(BaseComponent) {
  class withTorrentsComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        torrents: null,
        torrent: null,
        isNotFound: false,
      };
    }

    handleErrors = (e) => {
      this.setState({isNotFound: e.status === 404});
      if(e.data && e.data.message) {
        this.setState({error: {message: e.data.message}});
      } else {
        this.setState({error: {message: 'Unexpected errors'}});
        console.error(e);
      }
    };

    loadTorrent = async(id) => {
      try {
        this.props.startLoading(LOADING.TORRENTS);
        const torrent = (await api('GET', `/torrents/${id}`)).data;
        this.setState({
          torrent,
          error: null,
        });
      } catch(e) {
        this.handleErrors(e);
      } finally {
        this.props.stopLoading(LOADING.TORRENTS);
      }
    };

    loadTorrents = async() => {
      try {
        this.props.startLoading(LOADING.TORRENTS);
        const torrents = (await api('GET', `/torrents`)).data;
        this.setState({torrents, error: null});
      } catch(e) {
        this.handleErrors(e);
      } finally {
        this.props.stopLoading(LOADING.TORRENTS);
      }
    };

    loadTorrentUser = async(user_id) => {
      try {
        this.props.startLoading(LOADING.TORRENTS);
        const torrents = (await api('GET', `/users/${user_id}/torrents`)).data;
        this.setState({torrents});
      } catch(e) {
        this.handleErrors(e);
      } finally {
        this.props.stopLoading(LOADING.TORRENTS);
      }
    };

    resume = async(torrent) => {
      try {
        this.props.startLoading();
        return (await api('GET', `/torrents/${torrent.id}/resume`)).data;
      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
      }
    };

    pause = async(torrent) => {
      try {
        this.props.startLoading();
        return (await api('GET', `/torrents/${torrent.id}/pause`)).data;
      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
      }
    };

    remove = async(torrent) => {
      try {
        this.props.startLoading();
        return (await api('DELETE', `/torrents/${torrent.id}`));

      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
      }
    };

    getFile = async(torrent) => {
      try {
        this.props.startLoading();

      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
      }
    };

    render() {
      return <BaseComponent
        {...this.props}
        torrents={this.state.torrents}
        torrent={this.state.torrent}
        torrentError={this.state.error}
        torrentNotFound={this.state.isNotFound}
        loadTorrents={this.loadTorrents}
        loadTorrent={this.loadTorrent}
        loadTorrentUser={this.loadTorrentUser}
        resumeTorrent={this.resume}
        pauseTorrent={this.pause}
        removeTorrent={this.remove}
        getTorrentFile={this.getFile}
      />
    }
  }

  withTorrentsComponent.propTypes = {
    stopLoading: PropTypes.func,
    startLoading: PropTypes.func,
  };

  return connect(
    () => ({}),
    (dispatch) => ({
      startLoading: (type) => dispatch(loadingActions.startLoading(type)),
      stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
    })
  )(withTorrentsComponent);
}
