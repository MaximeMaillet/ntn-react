import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Link} from "react-router-dom";

import './torrents-list.scss';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";

class TorrentsList extends Component {
  render() {
    const {torrents, isAdmin, className} = this.props;
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
                      {
                        isAdmin &&
                          <Link className="btn btn-secondary ml-2" to={`/torrents/${torrent.id}/edit`}>
                            <i className="fa fa-edit" />
                            <FormattedMessage id="component.torrents.list.edit.cta" />
                          </Link>
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

export default connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
  })
)(TorrentsList);
