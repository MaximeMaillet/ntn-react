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
      audios: props.audios,
      audio: props.audios.filter((a) => a.default).length > 0 ? props.audios.filter((a) => a.default)[0] : props.audios[0],
      video: props.video,
      subtitles: props.subtitles,
      volume: 1,
      mute: false,
      playedSeconds: 0,
      totalSeconds: 0,
      fullscreen: false,
      active: true,
      ready: 0,
      currentSeconds: 0,
    };

    screenfull.on('change', () => {
      this.setState({fullscreen: screenfull.isFullscreen});
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleShortcut);
  }

  componentWillUnmount() {
    this.setState({currentSeconds: 0});
    document.removeEventListener('keydown', this.handleShortcut);
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
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.index !== this.props.index && this.props.index !== this.state.index) {
      this.setState({
        index: this.props.index,
      });
    }
  }

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

  prevSeek = () => {
    this.addSeek(-10);
  };

  nextSeek = () => {
    this.addSeek(10);
  };

  addSeek = (value) => {
    if(this.player_audio && this.player_video) {
      this.changeSeek(this.player_video.getCurrentTime()+value);
      this.changeSeek(this.player_audio.getCurrentTime()+value);
    } else {
      console.log(this.player_audio);
      console.log(this.player_video);
    }
  };

  onSliderChange = (value) => {
    const playedSeconds = (this.state.totalSeconds*value) / 100;
    if(this.player_video && this.player_audio) {
      this.player_video.seekTo(playedSeconds, 'seconds');
      this.player_audio.seekTo(playedSeconds, 'seconds');
      this.setState({playedSeconds});
    }
  };

  onSeek = (seconds) => {
    if(this.player_audio && this.player_video) {
      const ref = Math.floor(this.player_video.getCurrentTime());
      const currentAudio = Math.floor(this.player_audio.getCurrentTime());
      if(ref !== currentAudio) {
        this.player_audio.seekTo(ref);
        this.player_video.seekTo(ref);
      }
      clearInterval(this.playerInterval);
      this.playerInterval = null;
    } else {
      if(!this.playerInterval) {
        this.playerInterval = setInterval(() => {
          this.onSeek(seconds);
        }, 10);
      }
    }
  };

  changeSeek = (seconds) => {
    if(seconds < 0) {
      seconds = 0;
    }

    if(seconds > this.state.totalSeconds) {
      seconds = this.state.totalSeconds;
    }

    this.setState({playedSeconds: seconds});
    this.player_video.seekTo(seconds, 'seconds');
    this.player_audio.seekTo(seconds, 'seconds');
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

  audioChange = (srcLang) => {
    const audios = [];
    let audio = null;
    for(let i=0; i<this.state.audios.length; i++) {
      if(this.state.audios[i].srcLang === srcLang) {
        audio = this.state.audios[i];
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

    if(audio) {
      this.setState({
        currentSeconds: this.player_video.getCurrentTime(),
        audio,
        audios,
      });
    }
  };

  onPlay = () => {
    this.play();
  };

  onPause = () => {
    this.pause();
  };

  onDuration = (total) => {
    this.setState({totalSeconds: total});
  };

  onProgress = ({played, playedSeconds, loaded, loadedSeconds}) => {
    this.setState({playedSeconds});
  };

  onReady = (player) => {
    this.setState({
      ready: this.state.ready|player
    });
  };

  onStart = () => {
    if((this.state.ready & 1) && (this.state.ready & 2)) {
      this.changeSeek(this.state.currentSeconds);
      this.play();
    }
  };

  onError = (e) => {
    if(this.props.onError) {
      this.props.onError(e);
    }
  };

  playerVideo = player => {
    this.player_video = player
  };

  playerAudio = player => {
    this.player_audio = player
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
    const {className} = this.props;
    const {
      audio, audios, video, subtitles,
      playing, volume, mute,
      playedSeconds, totalSeconds,
      fullscreen, active,
    } = this.state;
    return (
      <div
        className={`wrapper-player ${className} ${fullscreen ? 'fullscreen' : ''} ${active ? 'active' : ''}`}
        ref={this.wrapperRef}
      >
        <ReactPlayer
          ref={this.playerVideo}
          className="player"
          width="100%"
          height="100%"
          url={video.src}
          controls={false}
          volume={mute ? 0 : volume}
          playing={playing}
          progressInterval={500}
          onError={this.onError}
          onProgress={this.onProgress}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onDuration={this.onDuration}
          onClick={this.playPause}
          onStart={this.onStart}
          onReady={() => this.onReady(1)}
          onSeek={this.onSeek}
          config={{
            file: {
              tracks: subtitles,
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
                <button className="btn-media" onClick={this.props.previous}><i className="fa fa-step-backward" /></button>
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
            </div>
          </div>
          <div className="progress-media">
            <Slider
              className="slider-media slider-horizontally"
              value={(playedSeconds*100)/totalSeconds}
              min={0}
              max={100}
              onChange={this.onSliderChange}
            />
            <div className="title-media">{video.name}</div>
          </div>
        </div>
        {
          audio &&
          <ReactPlayer
            ref={this.playerAudio}
            className="d-none"
            url={[audio]}
            volume={mute ? 0 : volume}
            playing={playing}
            controls={false}
            onError={this.onError}
            onStart={this.onStart}
            onReady={() => this.onReady(2)}
            onSeek={this.onSeek}
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous"
                },
              }
            }}
            wrapper="span"
          />
        }
      </div>
    );
  }
}

StreamVideo.defaultProps = {
  className: '',
  playing: false,
};

StreamVideo.propTypes = {
  className: PropTypes.string,
  video: PropTypes.object.isRequired,
  audios: PropTypes.array.isRequired,
  previous: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  subtitles: PropTypes.array,
  playing: PropTypes.bool,
};

export default StreamVideo
