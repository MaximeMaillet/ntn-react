import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Player from "../Player/Player";

import './streamer.scss'

class Streamer extends Component {
  render() {
    const {className, name, subtitles, videos, audios} = this.props;
    return (
      <div className={`streamer ${className}`}>
        <Player
          controlsFixed={false}
          name={name}
          videos={videos}
          audios={audios}
          subtitles={subtitles}
          next={this.props.next}
          previous={this.props.previous}
        />
      </div>
    );
  }
}

Streamer.defaultProps = {
  className: '',
};

Streamer.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array,
  audios: PropTypes.array,
  subtitles: PropTypes.array,
};

export default Streamer
