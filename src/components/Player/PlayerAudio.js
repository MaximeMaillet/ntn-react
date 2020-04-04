import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PlayerAudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.audioRef.current.addEventListener('playing', (event) => {
      console.log('Audio is no longer paused');
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.playing !== this.props.playing) {
      if(this.props.playing) {
        this.play();
      } else {
        this.pause();
      }
    }

    if(prevProps.mute !== this.props.mute) {
      if(this.props.mute) {
        this.mute();
      } else {
        this.unMute();
      }
    }

    if(prevProps.volume !== this.props.volume) {
      this.changeVolume(this.props.volume);
    }
  }

  mute = () => {
    this.setState({muted: true});
  };

  unMute = () => {
    this.setState({muted: false});
  };

  play = () => {
    this.audioRef.current.play();
  };

  pause = () => {
    this.audioRef.current.pause();
  };

  changeVolume = (volume) => {
    this.audioRef.current.volume = volume;
  };

  render() {
    const {playing, audios} = this.props;
    const {muted} = this.state;
    return (
      <div className={`player-audios`}>
        <audio
          ref={this.audioRef}
          muted={muted}
          controls
        >
          {
            audios.map((video, key) => {
              return <source key={key} src={video.src} />;
            })
          }
        </audio>
      </div>
    );
  }
}

PlayerAudio.defaultProps = {
  className: '',
};

PlayerAudio.propTypes = {
  className: PropTypes.string,
  audios: PropTypes.array,
};

export default PlayerAudio
