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
      media: get(props, 'torrent.medias[0]', null),
    };
  }

  selectFile = (media) => {
    this.setState({media});
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
    const {media} = this.state;
    return (
      <div className="d-flex flex-row content content-stream">
        <section className="main-block d-flex block-stream-menu">
          Name: {torrent.name}<br />
          Size : {torrent.total}<br />
          <br />
          <button className="btn btn-primary" onClick={this.download}>
            <i className="fa fa-download" />&nbsp;
            <FormattedMessage id="torrents.one.stream.download" />
          </button>
        </section>
        <section className="main-block d-flex block-stream-video">
          <Streamer media={media} torrent={this.props.torrent} />
        </section>
      </div>
    );
  }
}

export default TorrentOne