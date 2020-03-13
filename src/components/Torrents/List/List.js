import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import withAuth from "../../../hoc/withAuth";
import loadingActions from '../../../redux/loading/actions';
import {FormattedMessage, injectIntl} from "react-intl";
import api from "../../../libraries/api";

import './list.scss';
import withTorrents from "../../../hoc/withTorrents";
import notificationsActions from "../../../redux/notifications/actions";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torrents: [],
    }
  }

  componentDidMount() {
    this.props.loadTorrentUser(this.props.user);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.torrentError && this.props.torrentError) {
      this.props.startToaster(this.props.torrentError);
    }
  }

  transformOctet = (value) => {
    if(value > (1024*1024*1024)) {
      return `${Math.floor((value/(1024*1024*1024))* 100) / 100}Go`;
    } else if(value > (1024*1024)) {
      return `${Math.floor((value/(1024*1024))* 100) / 100}Mo`;
    } else if(value > 1024) {
      return `${Math.floor((value/1024)* 100) / 100}Ko`;
    }

    return `${value}o`;
  };

  showFiles = (torrent) => {

  };

  render() {
    return (
      <div className={`torrents-list ${this.props.loading ? 'is-loading': ''}`}>
        <div className="d-flex flex-row torrent-item title-item">
          <div className="item state"><FormattedMessage id="torrents.list.item.title.state" /></div>
          <div className="item name"><FormattedMessage id="torrents.list.item.title.name" /></div>
          <div className="item download octet"><FormattedMessage id="torrents.list.item.title.download" /></div>
          <div className="item upload octet"><FormattedMessage id="torrents.list.item.title.upload" /></div>
          <div className="item total octet"><FormattedMessage id="torrents.list.item.title.total" /></div>
          <div className="item ratio"><FormattedMessage id="torrents.list.item.title.ratio" /></div>
          <div className="item files"><FormattedMessage id="torrents.list.item.title.files" /></div>
          <div className="item actions"><FormattedMessage id="torrents.list.item.title.actions" /></div>
        </div>
        {this.props.torrents && this.props.torrents.map((torrent, key) => {
          return (
            <div className="d-flex flex-row align-items-center justify-content-center torrent-item content-item" key={key}>
              <div className="item state">
                {torrent.finished && <i className="fas fa-hourglass" title={this.props.intl.messages['torrents.list.item.is_finished']} />}
                {torrent.active && <i className="fas fa-cog" title={this.props.intl.messages['torrents.list.item.is_active']} />}
              </div>
              <div className="item name">
                <strong>{torrent.name}</strong>
                <span>{torrent.hash}</span>
              </div>
              <div className="item download octet">{this.transformOctet(torrent.downloaded)}</div>
              <div className="item upload octet">{this.transformOctet(torrent.uploaded)}</div>
              <div className="item total octet">{this.transformOctet(torrent.total)}</div>
              <div className="item ratio">{torrent.ratio}</div>
              <div className="item files">
                {torrent.files.length}
                <span onClick={() => this.showFiles(torrent)}>(<FormattedMessage id="torrents.list.item.files.show"/>)</span>
              </div>
              <div className="item actions">
                {torrent.active && <button className="btn btn-sm btn-primary" onClick={() => this.props.pauseTorrent(torrent)}><i className="fas fa-pause" /></button>}
                {!torrent.active && <button className="btn btn-sm btn-primary" onClick={() => this.props.resumeTorrent(torrent)}><i className="fas fa-play" /></button>}
                <button className="btn btn-sm btn-danger"><i className="fas fa-times" onClick={() => this.props.removeTorrent(torrent)} /></button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

List.propTypes = {
  user: PropTypes.object.isRequired,
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  torrentError: PropTypes.object,
  startToaster: PropTypes.func,
  resumeTorrent: PropTypes.func,
  pauseTorrent: PropTypes.func,
  removeTorrent: PropTypes.func,
  loadTorrentUser: PropTypes.func,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  }),
  (dispatch) => ({
    startLoading: () => dispatch(loadingActions.startLoading()),
    stopLoading: () => dispatch(loadingActions.stopLoading()),
    startToaster: (data) => dispatch(notificationsActions.start(data)),
  })
)(withAuth(injectIntl(withTorrents(List))));
