import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTorrents from "../../../hoc/withTorrents";
import {LOADING} from "../../../config/const";
import {connect} from "react-redux";
import moment from 'moment';

import './torrents-list.scss';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class TorrentsList extends Component {
  componentDidMount() {
    this.props.loadTorrents();
  }

  render() {
    const {torrents, torrentError, loading, className} = this.props;
    return (
      <div className={`main-list torrents-list ${className}`}>
        {
          (loading & LOADING.TORRENTS) ?
            <LoadingList />
          :
            (torrentError) ?
              <ErrorList torrentError={torrentError} />
            :
              (!this.props.torrents || this.props.torrents.length === 0) ?
                <EmptyList />
              :
                <List torrents={torrents} />
        }
      </div>
    );
  }
}

class List extends Component {
  static propsTypes = {
    torrents: PropTypes.array.isRequired,
  };

  render() {
    const {torrents, className} = this.props;
    return (
      <div className={`main-list torrents-list ${className}`}>
        {
          torrents.map((torrent, key) => {
            return (
              <div key={key} className="main-list-item torrents-list-item">
                <div className="poster">
                  <img src={torrent.poster} alt="poster" />
                </div>
                <div className="details">
                  <div className="info">
                    <h3>{torrent.original_title || torrent.name}</h3>
                    <div className="date">
                      {torrent.release_date ? `${moment(torrent.release_date).format('YYYY')} - ` : ''}
                      {torrent.runtime ? `${torrent.runtime}min` : ''}
                    </div>
                  </div>
                  <div className="overview">
                    {torrent.overview}
                  </div>
                  <div className="actions">
                    {
                      torrent.isStreamable &&
                      <Link className="btn btn-primary" to={`/torrents/${torrent.id}`}><i className="fa fa-tv" /> Stream</Link>
                    }
                  </div>
                  <div className="footer">
                    <div className="server-name">{torrent.server.name}</div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}

class EmptyList extends Component {
  render() {
    return (
      <div className="main-list-item item-empty">
        <div className="details">
          <FormattedMessage id="component.torrents.list.empty" />
        </div>
      </div>
    );
  }
}

class LoadingList extends Component {
  render() {
    return (
      <div className="main-list-item item-loading">
        <div className="details">
          <FormattedMessage id="component.torrents.list.loading" />
        </div>
      </div>
    );
  }
}

class ErrorList extends Component {
  render() {
    return (
      <div className="main-list-item item-error">
        <div className="error">
          <h3><FormattedMessage id="component.torrents.error_happened" /></h3>
          <p>{this.props.torrentError.message}</p>
        </div>
      </div>
    );
  }
}

TorrentsList.defaultProps = {
  className: '',
};

TorrentsList.propTypes = {
  torrents: PropTypes.array,
  className: PropTypes.string,
};

export default connect(
  (state) => ({
    loading: state.loading.loading,
  })
)(withTorrents(TorrentsList));
