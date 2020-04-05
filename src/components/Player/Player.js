import React, {Component} from 'react';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import Slider from 'rc-slider';
import {findDOMNode} from "react-dom";
import PlayerLoading from "./PlayerLoading";

import './player.scss'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitles: props.subtitles,
      audios: props.audios,
      playing: false,
      ready: false,
      fullscreen: false,
      volume: props.volume,
      active: false,
      muted: false,
      totalSeconds: 0,
      playedSeconds: 0,
      videoReady: false,
      audioReady: false,
    };
    this.videoRef = React.createRef();
    this.audioRef = React.createRef();
    this.wrapperRef = React.createRef();
    this.interval = [];
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleShortcut);
    if(this.videoRef.current && this.audioRef.current) {
      this.handleListener();
    }

    this.startAnimating(2);

    this.interval['ready'] = setInterval(() => {
      if(!this.state.ready) {
        if(!this.state.totalSeconds && this.videoRef.current.duration) {
          this.setState({totalSeconds: this.videoRef.current.duration});
        }
        this.handleReady();
      } else {
        clearInterval(this.interval['ready']);
        this.interval['ready'] = null;
      }
    }, 500);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(!this.state.ready) {
      this.handleReady();
    }

    if(prevState.muted !== this.state.muted) {
      this.handleMute(this.state.muted);
    }

    if(prevState.playing !== this.state.playing) {
      this.handlePlaying(this.state.playing);
    }

    if(prevState.volume !== this.state.volume) {
      this.handleVolume(this.state.volume);
    }

    if(prevState.audioDuration !== this.state.audioDuration) {
      this.handleDuration();
    }

    if(prevState.audioDuration !== this.state.audioDuration) {
      this.handleDuration();
    }

    if(prevState.audios !== this.state.audios) {
      this.audioRef.current.play();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.sync);
    document.removeEventListener('keydown', this.handleShortcut);
    this.videoRef.current.removeEventListener('canplaythrough', this.onVideoLoaded);
    this.audioRef.current.removeEventListener('canplaythrough', this.onAudioLoaded);
    this.videoRef.current.removeEventListener('timeupdate', this.onTimeUpdate());
    this.wrapperRef.current.removeEventListener('mousemove', this.onMouseMove);
  }

  handleShortcut = (event) => {
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
        this.props.previous();
        event.preventDefault();
        break;
      case 77: // M
        this.props.next();
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
      default:

    }
  };

  handleListener = () => {
    screenfull.on('change', () => {
      this.setState({fullscreen: screenfull.isFullscreen});
    });
    this.videoRef.current.addEventListener('timeupdate', this.onTimeUpdate);
    this.wrapperRef.current.addEventListener('mousemove', this.onMouseMove);
    this.videoRef.current.addEventListener('canplaythrough', this.onVideoLoaded);
    this.audioRef.current.addEventListener('canplaythrough', this.onAudioLoaded);
  };

  onAudioLoaded = () => {
    if(!this.state.audioReady) {
      this.setState({audioReady: true,});
    }
  };

  onVideoLoaded = () => {
    if(!this.state.videoReady) {
      this.setState({videoReady: true});
    }
  };

  onTimeUpdate = () => {
    if(this.videoRef.current) {
      this.setState({playedSeconds: this.videoRef.current.currentTime});
    }
  };

  onMouseMove = () => {
    if(!this.state.active) {
      this.setState({active: true});
      setTimeout(() => {
        this.setState({active: false});
      }, 5000);
    }
  };

  handleReady = () => {
    if(this.state.totalSeconds && this.state.videoReady && this.state.audioReady) {
      console.log(`#### All Ready : ${this.state.totalSeconds} seconds`);
      this.setState({ready: true});
    }
  };

  startAnimating = (fps) => {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.sync();
  };

  sync = () => {
    requestAnimationFrame(this.sync);
    const now = Date.now();
    const elapsed = now - this.then;
    if (elapsed > this.fpsInterval) {
      this.then = now - (elapsed % this.fpsInterval);
      if(this.audioRef.current && this.audioRef.current.readyState === 4) {
        this.audioRef.current.currentTime = this.videoRef.current.currentTime;
      }
    }
  };

  nextSeek = () => {
    this.videoRef.current.currentTime = this.videoRef.current.currentTime+5;
  };

  prevSeek = () => {
    this.videoRef.current.currentTime = this.videoRef.current.currentTime-5;
  };

  volumeUp = () => {
    this.changeVolume(this.state.volume+0.10);
  };

  volumeDown = () => {
    this.changeVolume(this.state.volume-0.10);
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

  handlePlaying = (playing) => {
    if(this.videoRef.current && this.audioRef.current) {
      if(playing) {
        this.videoRef.current.play();
        this.audioRef.current.play();
      } else {
        this.videoRef.current.pause();
        this.audioRef.current.pause();
      }
    }
  };

  muteUnmute = () => {
    if(this.state.muted) {
      this.unMute();
    } else {
      this.mute();
    }
  };

  mute = () => {
    this.setState({muted: true});
  };

  unMute = () => {
    this.setState({muted: false});
  };

  handleMute = (isMuted) => {
    if(this.videoRef.current && this.audioRef.current) {
      this.audioRef.current.muted = isMuted;
      this.videoRef.current.muted = isMuted;
    }
  };

  changeVolume = (volume) => {
    if(volume >= 0 && volume <= 1) {
      this.setState({volume});
    }
  };

  handleVolume = (volume) => {
    if(this.videoRef.current && this.audioRef.current) {
      this.audioRef.current.volume = volume;
      this.videoRef.current.volume = volume;
      clearInterval(this.interval['volume']);
      this.interval['volume'] = null;
    } else {
      if(!this.interval['volume']) {
        this.interval['volume'] = setInterval(() => {
          this.handleVolume(volume);
          console.log('Launch interval handle volume');
        }, 10);
      }
    }
  };

  onSliderChange = (value) => {
    this.handleSeek((this.state.totalSeconds*value) / 100);
  };

  handleSeek = (playedSeconds) => {
    if(this.videoRef.current && this.audioRef.current) {
      this.videoRef.current.currentTime = playedSeconds;
    }
  };


  tracksChange = (srcLang) => {
    const vid = this.videoRef.current;
    const stateTracks = this.state.subtitles;
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

    this.setState({subtitles: stateTracks});
  };

  handleFullScreen = () => {
    if(this.state.fullscreen) {
      this.setState({fullscreen: false});
      screenfull.exit();
    } else {
      this.setState({fullscreen: true});
      screenfull.request(findDOMNode(this.wrapperRef.current));
      this.setState({active: false});
    }
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

  audioChange = (srcLang) => {
    const audios = [];
    for(let i=0; i<this.state.audios.length; i++) {
      if(this.state.audios[i].srcLang === srcLang) {
        audios.push({
          ...this.state.audios[i],
          default: true,
        });
      } else {
        audios.push({
          ...this.state.audios[i],
          default: false,
        });
      }
    }

    this.setState({audios});
  };

  render() {
    const {className, videos, controlsFixed} = this.props;
    const {subtitles, audios, active, ready, playing, volume, muted, fullscreen, totalSeconds, playedSeconds} = this.state;
    return (
      <div
        ref={this.wrapperRef}
        className={`player ${controlsFixed ? 'controls-fixed':''} ${active ? 'active' : ''} ${fullscreen ? 'fullscreen' : ''} ${className}`}
      >
        <audio
          ref={this.audioRef}
          crossOrigin="anonymous"
          src={audios.filter((a) => a.default)[0].src}
        >
        </audio>
        <video
          onClick={this.playPause}
          ref={this.videoRef}
          crossOrigin="anonymous"
        >
          {
            videos.map((video, key) => {
              return <source key={key} src={video.src} />;
            })
          }

          {
            subtitles.map((subtitle, key)=> {
                return <track
                  key={key}
                  label={subtitle.label || subtitle.srcLang}
                  kind="subtitles"
                  srcLang={subtitle.srcLang}
                  src={subtitle.src}
                  default={subtitle.default}
                />
              }
            )}
        </video>
        <div
          onClick={this.playPause}
          className="fake-display"
        />
        <div className={`controls ${ready ? 'ready': 'no-ready'}`}>
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
            <div className="ml-auto d-flex flex-row">
              {
                (subtitles && subtitles.length > 0) &&
                <div className="wrapper-btn captions">
                  <div className="wrapper">
                    <div
                      className={`wrapper-line ${subtitles.filter((c) => c.active === 1).length === 0 ? 'enabled' : ''}`}
                      onClick={() => this.tracksChange(null)}
                    >
                      Off
                    </div>
                    {
                      subtitles.map((track, key) => {
                        return <div
                          key={key}
                          className={`wrapper-line ${track.active ? 'enabled': ''}`}
                          onClick={() => this.tracksChange(track.srcLang)}
                        >
                          {track.srcLang}
                        </div>
                      })
                    }
                  </div>
                  <button className="btn-media btn-wrapped btn-caption"><i className="fa fa-closed-captioning"/></button>
                </div>
              }
              {
                (audios && audios.length > 1) &&
                <div className="wrapper-btn audios">
                  <div className="wrapper">
                    {
                      audios.map((track, key) => {
                        return <div
                          key={key}
                          className={`wrapper-line ${track.default ? 'enabled': ''}`}
                          onClick={() => this.audioChange(track.srcLang)}
                        >
                          {track.srcLang}
                        </div>
                      })
                    }
                  </div>
                  <button className="btn-media btn-wrapped btn-caption"><i className="fa fa-flag"/></button>
                </div>
              }
              <div className="prev-next">
                <button className="btn-media" onClick={this.previous}><i className="fa fa-step-backward" /></button>
                <button className="btn-media" onClick={this.props.next}><i className="fa fa-step-forward"/></button>
              </div>
              <div className="wrapper-btn volume">
                <div className="wrapper">
                  <Slider
                    className="slider-media slider-volume"
                    vertical
                    min={0} max={100}
                    onChange={(value) => this.changeVolume(value/100)}
                    value={volume*100}
                  />
                </div>
                <button className="btn-media btn-wrapped btn-volume" onClick={this.muteUnmute}>
                  {(muted || volume === 0) && <i className="fa fa-volume-mute" />}
                  {(!muted && volume > 0 && volume <= 0.5) && <i className="fa fa-volume-down" />}
                  {(!muted && volume > 0.5) && <i className="fa fa-volume-up" />}
                </button>
              </div>
              <div className="fullscreen">
                <button className="btn-media" onClick={this.handleFullScreen}>
                  {fullscreen && <i className="fa fa-compress" />}
                  {!fullscreen && <i className="fa fa-expand" />}
                </button>
              </div>
            </div>
          </div>
          <div className="progress-media">
            <Slider
              className="slider-media slider-horizontally"
              value={(playedSeconds*100)/totalSeconds}
              min={0}
              max={100}
              onChange={this.onSliderChange}
              tipFormatter={value => `${value}`}
            />
          </div>
        </div>
        {
          !ready && <PlayerLoading />
        }
      </div>
    );
  }
}

Player.defaultProps = {
  className: '',
  volume: 1,
};

Player.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.array,
  audios: PropTypes.array,
  subtitles: PropTypes.array,
  previous: PropTypes.func,
  next: PropTypes.func,
  volume: PropTypes.number,
};

export default Player
