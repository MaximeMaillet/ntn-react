import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import withAuth from "../../../hoc/withAuth";
import loadingActions from '../../../redux/loading/actions';
import {FormattedMessage, injectIntl} from "react-intl";
import api from "../../../libraries/api";

import withTorrents from "../../../hoc/withTorrents";
import notificationsActions from "../../../redux/notifications/actions";

import './list.scss';
import Octet from "../../Octet/Octet";

class List extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!prevProps.torrentError && this.props.torrentError) {
      // this.props.startToaster(this.props.torrentError);
    }
  }

  showFiles = (torrent) => {

  };

  render() {
    const {torrents, loading} = this.props;
    console.log('-----re');
    console.log(loading);
    console.log(torrents);
    return (
      <div className={`list-main torrents-list ${loading ? 'is-loading' : ''}`}>
        <div className="title-item torrents-title-item">
          <div className="item state"><FormattedMessage id="torrents.list.item.title.state" /></div>
          <div className="item name"><FormattedMessage id="torrents.list.item.title.name" /></div>
          <div className="item download octet"><FormattedMessage id="torrents.list.item.title.download" /></div>
          <div className="item upload octet"><FormattedMessage id="torrents.list.item.title.upload" /></div>
          <div className="item total octet"><FormattedMessage id="torrents.list.item.title.total" /></div>
          <div className="item ratio"><FormattedMessage id="torrents.list.item.title.ratio" /></div>
          <div className="item files"><FormattedMessage id="torrents.list.item.title.files" /></div>
          <div className="item actions"><FormattedMessage id="torrents.list.item.title.actions" /></div>
        </div>
        {
          loading ?
            <div className="loading-item"/>
          :
            torrents.length === 0 ?
                <div className="no-item"><FormattedMessage id="torrents.list.no_item"/></div>
              :
                torrents.map((torrent, key) => {
                  return (
                    <div className="content-item torrents-content-item" key={key}>
                      <div className="item state">
                        {torrent.finished && <i className="fas fa-hourglass" title={this.props.intl.messages['torrents.list.item.is_finished']} />}
                        {torrent.active && <i className="fas fa-cog" title={this.props.intl.messages['torrents.list.item.is_active']} />}
                      </div>
                      <div className="item name">
                        <span>{torrent.name}</span>
                      </div>
                      <div className="item download octet"><Octet value={torrent.downloaded} /></div>
                      <div className="item upload octet"><Octet value={torrent.uploaded} /></div>
                      <div className="item total octet"><Octet value={torrent.total} /></div>
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
                })
        }
      </div>
    );
  }
}

List.propTypes = {
  torrents: PropTypes.array,
  loading: PropTypes.number,
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
  () => ({
  }),
  (dispatch) => ({
    startToaster: (data) => dispatch(notificationsActions.start(data)),
  })
)(injectIntl(withTorrents(List)));
