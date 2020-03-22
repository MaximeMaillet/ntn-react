import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import path from 'path';
import { parse, stringifyVtt } from 'subtitle'

class StreamVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tracks: [],
    };
  }

  componentDidMount() {
    // this.handleSubtitles();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // this.handleSubtitles()
  }

  handleSubtitles = async() => {
    const {torrent} = this.props;
    const tracks = [];
    if(torrent && torrent.files && torrent.files.length > 0) {
      for(let i=0; i<torrent.files.length; i++) {
        if(path.extname(torrent.files[i].path) === '.srt') {
          const sub = await this.convertTrack(torrent.files[i]);
          if(sub) {
            tracks.push(sub);
          }
        }
      }
    }

    this.setState({tracks, loading: false});
  };

  convertTrack = async(file) => {
    try {
      const result = await fetch(file.path);
      const buffer = await result.arrayBuffer();
      const decoder = new TextDecoder("iso-8859-1");
      const value = decoder.decode(buffer);
      const vtt = stringifyVtt(parse(value));
      const blob = new Blob([vtt], {type : 'text/vtt'});
      return {
        kind: 'subtitles',
        src: URL.createObjectURL(blob),
        default: file.default,
        srcLang: file.lang,
        label: file.label,
      };
    } catch(e) {
      console.log(e);
    }
  };

  handleError = (e, o, i) => {
    console.log('Player error');
    console.log(e);
    console.log(o);
    console.log(i);
  };

  render() {
    const {url, className} = this.props;
    return (
      <ReactPlayer
        className={className}
        url={url}
        controls
        onError={this.handleError}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous"
            },
            tracks: this.state.tracks
          }
        }}
      />
    );
  }
}

StreamVideo.defaultProps = {
  className: '',
};

StreamVideo.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  torrent: PropTypes.object,
};

export default StreamVideo
