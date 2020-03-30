import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StreamVideo from "./StreamInput/StreamVideo";
import {getLanguage} from "../../libraries/locale";

import './streamer.scss'
import {FormattedMessage} from "react-intl";

class Streamer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video: null,
      audios: null,
      playing: false,
      index: props.index,
    };
  }

  componentDidMount() {
    if(this.props.medias && this.props.medias.length > 0) {
      this.loadStream(this.props.medias[this.state.index].stream, false);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.index !== this.props.index) {
      this.setState({index: this.props.index});
    }

    if(prevState.index !== this.state.index && this.props.medias && this.props.medias.length > 0) {
      this.loadStream(this.props.medias[this.state.index].stream, true);
    }
  }

  loadStream = async(url, autoplay) => {
    try {
      this.setState({loading: true});
      const token = localStorage.getItem('token');
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept-Language': getLanguage(),
        }
      });
      const data = await result.json();
      this.setState({
        playing: autoplay,
        video: data.video,
        audios:data.audios.map((a) => {
          return {
            src: a.src,
            type: 'audio/mpeg',
            srcLang: a.lang,
            default: a.default,
          }
        }),
        subtitles: data.subtitles.map((s) => {
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

  previous = () => {
    let newIndex = this.state.index-1;
    if(newIndex < 0) {
      newIndex = 0;
    }

    this.setState({index: newIndex});
  };

  next = () => {
    let newIndex = this.state.index+1;
    if(newIndex >= this.props.medias.length-1) {
      newIndex = this.props.medias.length-1;
    }

    this.setState({index: newIndex});
  };

  onPlayerError = (e) => {
    console.log('Player error');
    console.log(e);
  };

  render() {
    const {loading, subtitles, video, audios} = this.state;
    if(!this.props.medias || this.props.medias.length === 0) {
      return (
        <div className="streamer streamer-empty">
          <FormattedMessage id="component.streamer.no_medias" />
        </div>
      );
    }
    return (
      <div className="d-flex flex-column streamer">
        {
          (!loading && video && audios) &&
            <StreamVideo
              className="video"
              video={video}
              audios={audios}
              subtitles={subtitles}
              playing={this.state.playing}
              next={this.next}
              previous={this.previous}
              onError={this.onPlayerError}
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
