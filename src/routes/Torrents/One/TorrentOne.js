import React, {Component} from 'react';
import Streamer from "../../../components/Streamer/Streamer";
import get from 'lodash.get';
import {FormattedMessage} from "react-intl";
import api from "../../../libraries/api";
import path from 'path';

import './torrent-one.scss'

class TorrentOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medias: get(props, 'torrent.medias', []),
      streamIndex: 0,
      playing: false,
    };
  }

  selectStream = (index) => {
    this.setState({streamIndex: index});
  };

  download = async() => {
    try {
      await api('GET', `/torrents/${this.props.torrent.id}/download/${this.state.media.id}`, null, null, {
        name: this.props.torrent.name,
        extension: path.extname(this.state.media.name),
      });
    } catch(e) {
      console.warn(e);
    }
  };

  render() {
    const {torrent} = this.props;
    const {streamIndex, medias} = this.state;
    return (
      <div className="d-flex flex-row content content-stream">
        <section className="main-block d-flex flex-column block-stream-menu">
          <div className="details">
            Name: {torrent.name}<br />
            Size : {torrent.total}<br />
          </div>
          <div className="links">
            <button className="btn btn-primary" onClick={this.download}>
              <i className="fa fa-download" />&nbsp;
              <FormattedMessage id="torrents.one.stream.download" />
            </button>
          </div>
          <div className="medias">
            {
              medias.map((media, key) => {
                return (
                  <div key={key} className="media">
                    <a href="#" onClick={() => this.selectStream(key)}>{media.name}</a>
                  </div>
                );
              })
            }
          </div>
        </section>
        <section className="main-block d-flex block-stream-video">
          <Streamer
            medias={medias}
            index={streamIndex}
          />
        </section>
      </div>
    );
  }
}

export default TorrentOne