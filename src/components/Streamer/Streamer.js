import React, {Component} from 'react';
import path from 'path';
import StreamVideo from "./StreamInput/StreamVideo";

import './streamer.scss'

class Streamer extends Component {
  render() {
    const {torrent, media} = this.props;
    if(!torrent || !media) {
      return null;
    }

    return (
      <div className="d-flex flex-column streamer">
        {
          media.type === 'video' && <StreamVideo className="video" torrent={torrent} url={media.stream} />
        }
      </div>
    );
  }
}

export default Streamer
