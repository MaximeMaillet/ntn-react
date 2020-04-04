import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from "react-dom";

class PlayerVideo extends Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.audioRef = React.createRef();

    this.stop = false;
    this.frameCount = 0;
    // this.$results = $("#results");
    // this.fps, fpsInterval, startTime, now, then, elapsed;
  }

  componentDidMount() {



    // scrub.bind("change", function() {
    //   var val = this.value;
    //   popCornRef.video.currentTime(val);
    //   popCornRef.audio.currentTime(val);
    // });

    this.videoRef.current.addEventListener('pause', () => {
      this.audioRef.current.pause();
    });

    this.videoRef.current.addEventListener('play', () => {
      this.audioRef.current.play();
    });

    this.videoRef.current.addEventListener('seeking', () => {
      this.audioRef.current.currentTime = this.videoRef.current.currentTime;
    });

    this.startAnimating(4);
  }



// initialize the timer variables and start the animation


  render() {
    const {className, audios, subtitles, videos} = this.props;
    return (
      <div className={`player-video ${className}`}>
        <video
          ref={this.videoRef}
          height="180" width="300"
          id="video"
          controls
        >
          {
            videos.map((video, key) => {
              return <source key={key} src={video.src}/>;
            })
          }
        </video>
        <video
          ref={this.audioRef}
          height="180" width="300"
          id="audio"
          controls
        >
          {
            audios.map((video, key) => {
              return <source key={key} src={video.src}/>;
            })
          }
        </video>
      </div>
    );
  }
}

PlayerVideo.defaultProps = {
  className: '',
  onPlay: () => null,
  onPause: () => null,
};

PlayerVideo.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array,
  subtitles: PropTypes.array,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
};

export default PlayerVideo
