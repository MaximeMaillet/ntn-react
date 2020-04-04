import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {Link, withRouter} from "react-router-dom";
import MetaDetail from "../../Meta/Detail/MetaDetail";

import './torrents-list.scss';

class TorrentsList extends Component {
  goToStream = (torrentId) => {
    this.props.history.push(`/torrents/${torrentId}`);
  };

  render() {
    const {torrents, isAdmin, className} = this.props;
    return (
      <div className={`main-list torrents-list ${className}`}>
        {
          torrents.map((torrent, key) => {
            return (
              <div key={key} className="main-list-item torrents-list-item">
                <MetaDetail
                  className="torrents-list-item-meta"
                  {...torrent}
                  onPosterClick={() => this.goToStream(torrent.id)}
                />
                <div className="footer">
                  <div className="actions">
                    {
                      torrent.isStreamable &&
                      <Link className="btn btn-icon btn-primary" to={`/torrents/${torrent.id}`}><i className="fa fa-tv" />Stream</Link>
                    }
                    {
                      isAdmin &&
                      <Link className="btn btn-icon btn-secondary ml-2" to={`/torrents/${torrent.id}/edit`}>
                        <i className="fa fa-edit" />
                        <FormattedMessage id="component.torrents.list.edit.cta" />
                      </Link>
                    }
                  </div>
                  <div className="server-name">{torrent.server.name}</div>
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
)(withRouter(TorrentsList));
