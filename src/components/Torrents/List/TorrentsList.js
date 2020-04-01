import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from "react-router-dom";

import './torrents-list.scss';

class TorrentsList extends Component {
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
                    <h3>{torrent.title || torrent.name}</h3>
                    <div className="date">
                      {torrent.release_date ? `${moment(torrent.release_date).format('YYYY')} - ` : ''}
                      {torrent.runtime ? `${torrent.runtime}min` : ''}
                    </div>
                  </div>
                  <div className="overview">
                    {torrent.overview}
                  </div>
                  <div className="footer">
                    <div className="actions">
                      {
                        torrent.isStreamable &&
                        <Link className="btn btn-primary" to={`/torrents/${torrent.id}`}><i className="fa fa-tv" />Stream</Link>
                      }
                    </div>
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

TorrentsList.defaultProps = {
  className: '',
};

TorrentsList.propTypes = {
  torrents: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default TorrentsList;
