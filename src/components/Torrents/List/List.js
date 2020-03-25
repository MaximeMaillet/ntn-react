import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Octet from "../../Octet/Octet";
import {FormattedMessage, injectIntl} from "react-intl";
import {Link} from "react-router-dom";

import withTorrents from "../../../hoc/withTorrents";
import notificationsActions from "../../../redux/notifications/actions";

import './list.scss';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      torrentModal: null,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.torrentError && this.props.torrentError) {
      // this.props.startToaster(this.props.torrentError);
    }
  }

  showFiles = (torrent) => {
    this.props.history.push(`/torrents/${torrent.id}/stream`);
  };

  render() {
    const {torrents, loading, isAdmin} = this.props;
    return (
      <div className={`list-main torrents-list ${loading ? 'is-loading' : ''}`}>
        <div className="title-item torrents-title-item">
          <div className="item state"><FormattedMessage id="torrents.list.item.title.state"/></div>
          <div className="item name"><FormattedMessage id="torrents.list.item.title.name"/></div>
          <div className="item download octet"><FormattedMessage id="torrents.list.item.title.download"/></div>
          <div className="item upload octet"><FormattedMessage id="torrents.list.item.title.upload"/></div>
          <div className="item total octet"><FormattedMessage id="torrents.list.item.title.total"/></div>
          <div className="item ratio"><FormattedMessage id="torrents.list.item.title.ratio"/></div>
          <div className="item files"><FormattedMessage id="torrents.list.item.title.files"/></div>
          {isAdmin && <div className="item actions"><FormattedMessage id="torrents.list.item.title.actions"/></div>}
        </div>
        {loading ? <div className="loading-item"/> : ''}
        {!loading && torrents ?
          torrents.length === 0 ?
            <div className="no-item"><FormattedMessage id="torrents.list.no_item"/></div>
            :
            torrents.map((torrent, key) => {
              return (
                <div className="content-item torrents-content-item" key={key}>
                  <div className="item state">
                    {
                      (torrent.finished && torrent.isStreamable) &&
                      <Link to={`/torrents/${torrent.id}`}><i className="fa fa-tv"/></Link>
                    }
                  </div>
                  <div className="item name">
                    <span>{torrent.name}</span>
                  </div>
                  <div className="item download octet"><Octet value={torrent.downloaded}/></div>
                  <div className="item upload octet"><Octet value={torrent.uploaded}/></div>
                  <div className="item total octet"><Octet value={torrent.total}/></div>
                  <div className="item ratio">{torrent.ratio}</div>
                  <div className="item files">{torrent.medias.length}</div>
                  {
                    isAdmin &&
                    <div className="item actions">
                      {torrent.active ?
                        <button className="btn btn-sm btn-primary" onClick={() => this.props.pauseTorrent(torrent)}><i
                          className="fas fa-pause"/></button> : ''}
                      {torrent.active ?
                        <button className="btn btn-sm btn-primary" onClick={() => this.props.resumeTorrent(torrent)}><i
                          className="fas fa-play"/></button> : ''}
                      <button className="btn btn-sm btn-danger"><i className="fas fa-times"
                                                                   onClick={() => this.props.removeTorrent(torrent)}/>
                      </button>
                    </div>
                  }
                </div>
              );
            })
          : ''
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
  isAdmin: PropTypes.bool,
};

export default connect(
  (state) => ({
    isAdmin: state.user.isAdmin,
  }),
  (dispatch) => ({
    startToaster: (data) => dispatch(notificationsActions.start(data)),
  })
)(injectIntl(withTorrents(List)));
