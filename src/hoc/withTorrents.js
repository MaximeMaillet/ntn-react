import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
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
        loading: true,
      };
    }

    componentDidMount() {
      if(this.props.torrents) {
        this.setState({torrents: this.props.torrents, loading: false});
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevProps.loading !== this.props.loading) {
        // console.log('Change loading');
        // console.log(this.props.loading);
      }

      if((prevProps.loading & LOADING.TORRENTS) !== 0 && (this.props.loading & LOADING.TORRENTS) === 0) {
        console.log('done loading');
      }

      if(!prevProps.torrents && this.props.torrents) {
        this.setState({torrents: this.props.torrents})
      }
    }

    static getDerivedStateFromProps(props, state) {
      if(!state.torrents && props.torrents) {
        return {torrents: props.torrents, loading: props.loading};
      }

      return state;
    }

    loadTorrent = async() => {
      try {
        this.props.startLoading();
        const torrents = (await api('GET', `/torrents`)).data;
        this.setState({torrents});
      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
      }
    };

    loadTorrentUser = async(user) => {
      try {
        this.props.startLoading();
        const torrents = (await api('GET', `/users/${user.id}/torrents`)).data;
        this.setState({torrents});
      } catch(e) {
        this.setState({error: e.data});
      } finally {
        this.props.stopLoading();
        this.setState({error: null});
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
      console.log('WT :: render');
      console.log(this.state.torrents);
      return <BaseComponent
        {...this.props}
        torrents={this.state.torrents}
        torrentError={this.state.error}
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
      startLoading: () => dispatch(loadingActions.startLoading()),
      stopLoading: () => dispatch(loadingActions.stopLoading()),
    })
  )(withRouter(withTorrentsComponent));
}
