import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom'
import Slider from 'rc-slider';
import screenfull from 'screenfull';

import './stream-video.scss';

class StreamVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: props.playing,
      index: props.index,
      media: Array.isArray(props.medias) ? props.medias[props.index] : props.medias,
      tracks: props.tracks,
      progress: 0,
      volume: 1,
      mute: false,
      playedSeconds: 0,
      totalSeconds: 0,
      fullscreen: false,
      active: true,
    };
  }

  componentDidMount() {
    screenfull.on('change', () => {
      this.setState({fullscreen: screenfull.isFullscreen});
    });
    document.addEventListener("keydown", event => {
      console.log(`Key code event : ${event.keyCode}`);
      if (event.isComposing || event.keyCode === 229) {
        return;
      }

      switch(event.keyCode) {
        case 32: //enter
          this.playPause();
          event.preventDefault();
          break;
        case 37: // Prev
          this.prevSeek();
          event.preventDefault();
          break;
        case 39: // Next
          this.nextSeek();
          event.preventDefault();
          break;
        case 81: // Q
          this.previous();
          event.preventDefault();
          break;
        case 77: // M
          this.next();
          event.preventDefault();
          break;
        case 38: // up
          this.volumeUp();
          event.preventDefault();
          break;
        case 40: // Down
          this.volumeDown();
          event.preventDefault();
          break;
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.index !== this.state.index) {
      this.setState({
        media: this.props.medias[this.state.index],
        playing: true,
      });
    }

    if(prevProps.index !== this.props.index && this.props.index !== this.state.index) {
      this.setState({
        index: this.props.index,
      });
    }
  }

  previous = () => {
    this.setState({index: this.state.index <= 0 ? 0 : this.state.index-1});
  };

  next = () => {
    this.setState({index: this.state.index+1 >= this.props.medias.length ? this.props.medias.length-1 : this.state.index+1});
  };

  playPause = () => {
    if(this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  };

  play = () => {
    this.setState({playing: true});
  };

  pause = () => {
    this.setState({playing: false});
  };

  prevSeek = () => {
    this.changeSeek(this.player.getCurrentTime()-10);
  };

  nextSeek = () => {
    this.changeSeek(this.player.getCurrentTime()+10);
  };

  volumeUp = () => {
    this.changeVolume(this.state.volume+0.10);
  };

  volumeDown = () => {
    this.changeVolume(this.state.volume-0.10);
  };

  muteUnmute = () => {
    if(this.state.mute) {
      this.unmute();
    } else {
      this.mute();
    }
  };

  mute = () => {
    this.setState({mute: true});
  };

  unmute = () => {
    this.setState({mute: false});
  };

  changeVolume = (volume) => {
    if(volume < 0) {
      volume = 0;
    }
    if(volume > 1) {
      volume = 1;
    }
    this.setState({volume});
  };

  changeSeek = (seconds) => {
    if(seconds < 0) {
      seconds = 0;
    }

    if(seconds > this.state.totalSeconds) {
      seconds = this.state.totalSeconds;
    }

    this.setState({playedSeconds: seconds});
    this.player.seekTo(seconds, 'seconds');
  };

  transformHumanReadableTime = (seconds) => {
    const hour = Math.floor(seconds/3600);
    const minute = Math.floor((seconds/60)%60);
    const second = Math.floor(seconds%60);

    if(hour > 0) {
      return `${hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    }

    return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
  };

  handleFullScreen = () => {
    if(this.state.fullscreen) {
      this.setState({fullscreen: false});
      screenfull.exit();
    } else {
      this.setState({fullscreen: true});
      screenfull.request(findDOMNode(this.wrapper));
      this.setState({active: false});
    }
  };

  tracksChange = (srcLang) => {
    const vid = document.getElementsByTagName('video')[0];
    const stateTracks = this.state.tracks;
    const tracks = vid.textTracks;
    for(let i = 0; i<tracks.length; i++) {
      if (tracks[i].language === srcLang) {
        stateTracks[i].active = 1;
        tracks[i].mode = 'showing';
      } else {
        stateTracks[i].active = 0;
        tracks[i].mode = 'disabled';
      }
    }

    this.setState({tracks: stateTracks});
  };

  onPlay = () => {
    this.setState({playing: true});
  };

  onPause = () => {
    this.setState({playing: false})
  };

  onDuration = (total) => {
    this.setState({totalSeconds: total});
  };

  onProgress = ({played, playedSeconds, loaded, loadedSeconds}) => {
    this.setState({playedSeconds});
  };

  onSeekChange = (value) => {
    const playedSeconds = (this.state.totalSeconds*value) / 100;
    this.player.seekTo(playedSeconds, 'seconds');
    this.setState({playedSeconds});
  };

  onError = (e) => {
    console.log('Player error');
    console.log(e);
    if(this.props.onError) {
      this.props.onError(e);
    }
  };

  ref = player => {
    this.player = player
  };

  wrapperRef = wrapper => {
    if(wrapper) {
      this.wrapper = wrapper;
      this.wrapper.addEventListener('mousemove', () => {
        if(!this.state.active) {
          this.setState({active: true});
          setTimeout(() => {
            this.setState({active: false});
          }, 3000);
        }
      });
    }
  };

  render() {
    const {className, src} = this.props;
    const {media, tracks, playedSeconds, totalSeconds, fullscreen, playing, active, volume, mute} = this.state;
    return (
      <div
        className={`wrapper-player ${className} ${fullscreen ? 'fullscreen' : ''} ${active ? 'active' : ''}`}
        ref={this.wrapperRef}
      >
        <ReactPlayer
          ref={this.ref}
          className="player"
          width="100%"
          height="100%"
          controls={false}
          url={src}
          volume={mute ? 0 : volume}
          playing={playing}
          progressInterval={500}
          onError={this.onError}
          onProgress={this.onProgress}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onDuration={this.onDuration}
          onClick={this.playPause}
          config={{
            file: {
              tracks,
              attributes: {
                crossOrigin: "anonymous"
              },
            }
          }}
          wrapper="span"
        />
        <div className="controls">
          <div className="buttons">
            <div className="play-pause">
              <button className="btn-media" onClick={this.playPause}>
                {!playing && <i className="fa fa-play" />}
                {playing && <i className="fa fa-pause" />}
              </button>
              <div className="seeking">
                {this.transformHumanReadableTime(playedSeconds)} / {this.transformHumanReadableTime(totalSeconds)}
              </div>
            </div>
            <div className="volume">
              <div className="wrapper-volume">
                <Slider
                  className="slider-media slider-volume"
                  vertical
                  min={0} max={100}
                  onChange={(value) => this.changeVolume(value/100)}
                  value={volume*100}
                />
              </div>
              <button className="btn-media btn-volume" onClick={this.muteUnmute}>
                {(mute || volume === 0) && <i className="fa fa-volume-mute" />}
                {(!mute && volume > 0 && volume <= 0.5) && <i className="fa fa-volume-down" />}
                {(!mute && volume > 0.5) && <i className="fa fa-volume-up" />}
              </button>
            </div>
            <div className="fullscreen">
              <button className="btn-media" onClick={this.handleFullScreen}>
                {fullscreen && <i className="fa fa-compress" />}
                {!fullscreen && <i className="fa fa-expand" />}
              </button>
            </div>
            <div className="prev-next">
              <button className="btn-media" onClick={this.previous}><i className="fa fa-step-backward" /></button>
              <button className="btn-media" onClick={this.next}><i className="fa fa-step-forward"/></button>
            </div>
            {
              tracks.length > 0 &&
              <div className="captions">
                <div className="wrapper-captions">
                  <div className={`track ${tracks.filter((c) => c.active === 1).length === 0 ? 'enabled' : ''}`} onClick={() => this.tracksChange(null)}>
                    Off
                  </div>
                  {
                    tracks.map((track, key) => {
                      console.log(track)
                      return <div
                        key={key}
                        className={`track ${track.active ? 'enabled': ''}`}
                        onClick={() => this.tracksChange(track.srcLang)}
                      >
                        {track.srcLang}
                      </div>
                    })
                  }
                </div>
                <button className="btn-media btn-caption"><i className="fa fa-closed-captioning"/></button>
              </div>
            }
          </div>
          <div className="progress-media">
            <Slider
              className="slider-media slider-horizontally"
              value={(playedSeconds*100)/totalSeconds}
              min={0}
              max={100}
              onChange={this.onSeekChange}
            />
            <div className="title-media">{media.name}</div>
          </div>
        </div>
      </div>
    );
  }
}

StreamVideo.defaultProps = {
  className: '',
  index: 0,
  playing: false,
};

StreamVideo.propTypes = {
  className: PropTypes.string,
  medias: PropTypes.array.isRequired,
  index: PropTypes.number,
  playing: PropTypes.bool,
};

export default StreamVideo
