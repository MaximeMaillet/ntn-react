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
    this.handleSubtitles();
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
      const value = await result.text();
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

  render() {
    const {url} = this.props;
    if(this.state.loading) {
      return null;
    }

    return (
      <ReactPlayer
        url={url}
        controls
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

StreamVideo.propTypes = {
  url: PropTypes.string.isRequired,
  torrent: PropTypes.object,
};

export default StreamVideo
