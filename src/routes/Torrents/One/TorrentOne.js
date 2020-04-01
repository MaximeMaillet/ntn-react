import React, {Component} from 'react';
import Streamer from "../../../components/Streamer/Streamer";
import {FormattedMessage} from "react-intl";
import api from "../../../libraries/api";
import path from 'path';
import Runtime from "../../../components/Torrents/Runtime/Runtime";
import ReleaseDate from "../../../components/Torrents/ReleaseDate/ReleaseDate";
import Octet from "../../../components/Octet/Octet";

import './torrent-one.scss'

class TorrentOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamIndex: props.torrent.medias.findIndex((m) => m.stream),
    };
  }

  selectStream = (index) => {
    this.setState({streamIndex: index});
  };

  download = async(key) => {
    try {
      await api('GET', `/torrents/${this.props.torrent.id}/download/${this.props.torrent.medias[key].id}`, null, null, {
        name: this.props.torrent.name,
        extension: path.extname(this.props.torrent.medias[key].name),
      });
    } catch(e) {
      console.warn(e);
    }
  };

  render() {
    const {torrent} = this.props;
    const {streamIndex} = this.state;
    return (
      <div className="torrent-one">
        <h1>{torrent.name}</h1>
        <div className="torrent-details">
          <div className="block-stream-menu">
            <div className="d-flex flex-row">
              <div className="poster">
                <img src={torrent.poster} alt="poster" />
              </div>
              <div className="infos">
                <div className="details">
                  <h2>{torrent.title}</h2>
                  <div className="date-runtime">
                    <ReleaseDate date={torrent.release_date} /> - <Runtime runtime={torrent.runtime} />
                  </div>
                  <div className="sizes-total">
                    <span className="label"><FormattedMessage id="component.torrents.one.size_total" /></span>
                    <Octet value={torrent.total} />
                  </div>
                  <div className="sizes-upload">
                    <span className="label"><FormattedMessage id="component.torrents.one.size_upload" /></span>
                    <Octet value={torrent.uploaded} />
                  </div>
                </div>
              </div>
            </div>
            <div className="medias">
              <h3><FormattedMessage id="component.torrents.one.medias" /></h3>
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
                        className={`media ${key === this.state.streamIndex ? 'active' : ''}`}
                      >
                        <div className="security" title={media.security}>
                          {media.security === 'warning' && <i className="fa fa-exclamation-triangle" />}
                          {media.security === 'danger' && <i className="fa fa-radiation" />}
                        </div>
                        <span>{media.name}</span>
                        <button className="btn btn-primary" onClick={() => this.download(key)}>
                          <i className="fa fa-download" />
                        </button>
                        {
                          media.stream ?
                            key === this.state.streamIndex ?
                              <button className="btn btn-primary" disabled>
                                <i className="fa fa-object-ungroup" />
                              </button>
                              :
                              <button className="btn btn-primary" onClick={() => this.selectStream(key)}>
                                <i className="fa fa-tv" />
                              </button>
                            :
                            ''
                        }
                      </div>
                    );
                  })
              }
            </div>
          </div>
          <div className="block-stream-video">
            <Streamer
              medias={torrent.medias}
              index={streamIndex}
            />
          </div>
        </div>

      </div>
    );
  }
}

export default TorrentOne