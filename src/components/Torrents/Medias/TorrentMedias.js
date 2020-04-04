import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import api from "../../../libraries/api";
import path from 'path';

import './torrent-media.scss'
import {connect} from "react-redux";
import loadingActions from "../../../redux/loading/actions";
import {LOADING} from "../../../config/const";

class TorrentMedias extends Component {
  download = async(media) => {
    try {
      this.props.startLoading(LOADING.FULL);
      await api('GET', `/torrents/${this.props.torrent.id}/download/${media.id}`, null, null, {
        name: path.basename(media.path),
      });
    } catch(e) {
      console.warn(e);
    } finally {
      this.props.stopLoading(LOADING.FULL);
    }
  };

  render() {
    const {torrent, className, indexStreamed} = this.props;
    return (
      <div className={`torrent-medias ${className}`}>
        <h3><FormattedMessage id="component.torrents.one.medias" /></h3>
        <div className="torrent-media-list">
          {
            (!torrent.medias || torrent.medias.length === 0) ?
              <div className="media">
                <FormattedMessage id="component.torrents.one.no_medias" />
              </div>
              :
              torrent.medias.map((media, key) => {
                return (
                  <div
                    key={key}
                    className={`media ${key === indexStreamed ? 'active' : ''}`}
                  >
                    <div className="security" title={media.security}>
                      {media.security === 'warning' && <i className="fa fa-exclamation-triangle" />}
                      {media.security === 'danger' && <i className="fa fa-radiation" />}
                    </div>
                    <span>{media.name}</span>
                    <div className="actions">
                      <button className="btn btn-primary" onClick={() => this.download(media)}>
                        <i className="fa fa-download" />
                      </button>
                      {
                        media.stream ?
                          key === indexStreamed ?
                            <button className="btn btn-primary" disabled>
                              <i className="fa fa-object-ungroup" />
                            </button>
                            :
                            <button className="btn btn-primary" onClick={() => this.props.selectStream(key, media)}>
                              <i className="fa fa-tv" />
                            </button>
                          :
                          ''
                      }
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
    );
  }
}

TorrentMedias.defaultProps = {
  className: '',
  indexStreamed: -1,
};

TorrentMedias.propTypes = {
  className: PropTypes.string,
  torrent: PropTypes.object,
  indexStreamed: PropTypes.number,
  selectStream: PropTypes.func,
};

export default connect(
  () => ({}),
  (dispatch) => ({
    startLoading: (type) => dispatch(loadingActions.startLoading(type)),
    stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
  })
)(TorrentMedias);
