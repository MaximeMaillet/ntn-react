import React, {Component} from 'react';

import './streamer.scss'

class Streamer extends Component {
  render() {
    const {file} = this.props;
    if(!file) {
      return null;
    }
    return (
      <div className="d-flex flex-column streamer">
        <video id="videoPlayer" autoPlay={true} controls>
          <source src={`${process.env.REACT_APP_API_URL}/stream/${file.id}`} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default Streamer
