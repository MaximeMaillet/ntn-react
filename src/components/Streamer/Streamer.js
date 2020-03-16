import React, {Component} from 'react';
import path from 'path';

import './streamer.scss'
import StreamVideo from "./StreamInput/StreamVideo";
const videoExtnameAvailable = ['.avi', '.mkv', '.mp4'];

class Streamer extends Component {
  render() {
    const {torrent, file} = this.props;
    if(!torrent || !file) {
      return null;
    }

    return (
      <div className="d-flex flex-column streamer">
        {
          videoExtnameAvailable.indexOf(path.extname(file.path)) !== -1 &&
            <StreamVideo url={`${process.env.REACT_APP_STREAM_URL}/${torrent.hash}?file=${encodeURIComponent(file.path)}`}/>
        }
      </div>
    );
  }
}

export default Streamer
