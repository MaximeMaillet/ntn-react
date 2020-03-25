import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StreamVideo from "./StreamInput/StreamVideo";
import {getLanguage} from "../../libraries/locale";

import './streamer.scss'

class Streamer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: props.medias[props.index],
      loading: true,
      tracks: null,
      src: null,
    };
  }

  componentDidMount() {
    this.loadStream();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.index !== this.props.index || prevProps.medias !== this.props.medias) {
      this.loadStream();
    }
  }

  loadStream = async() => {
    try {
      this.setState({loading: true});
      const token = localStorage.getItem('token');
      const result = await fetch(this.state.media.stream, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': getLanguage(),
        }
      });
      const data = await result.json();
      this.setState({
        src: data.video,
        tracks: data.subtitles.map((s) => {
          return {
            kind: 'subtitles',
            srcLang: s.lang,
            src: s.src,
            default: !!s.default,
            active: s.default ? 1 : 0
          }
        })
      });

    } catch(e) {
      console.warn(e);
    } finally {
      this.setState({loading: false});
    }
  };

  render() {
    const {medias, index} = this.props;
    const {loading, src, tracks} = this.state;
    return (
      <div className="d-flex flex-column streamer">
        {
          (!loading && src) &&
            <StreamVideo
              className="video"
              src={src}
              tracks={tracks}
              medias={medias}
              index={index}
            />
        }
      </div>
    );
  }
}

Streamer.defaultProps = {
  index: 0,
};

Streamer.propTypes = {
  medias: PropTypes.array.isRequired,
  index: PropTypes.number,
};

export default Streamer
