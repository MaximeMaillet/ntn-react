import React, {Component} from 'react';
import path from 'path';
import StreamVideo from "./StreamInput/StreamVideo";

import './streamer.scss'
import {parse, stringifyVtt} from "subtitle";

class Streamer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      media: null,
    }
  }
//
// componentDidMount() {
//   // this.handleSubtitles();
// }
//
// componentDidUpdate(prevProps, prevState, snapshot) {
//   // this.handleSubtitles()
// }
//
// handleSubtitles = async() => {
//   const {torrent} = this.props;
//   const tracks = [];
//   if(torrent && torrent.files && torrent.files.length > 0) {
//     for(let i=0; i<torrent.files.length; i++) {
//       if(path.extname(torrent.files[i].path) === '.srt') {
//         const sub = await this.convertTrack(torrent.files[i]);
//         if(sub) {
//           tracks.push(sub);
//         }
//       }
//     }
//   }
//
//   this.setState({tracks, loading: false});
// };
//
// convertTrack = async(file) => {
//   try {
//     const result = await fetch(file.path);
//     const buffer = await result.arrayBuffer();
//     const decoder = new TextDecoder("iso-8859-1");
//     const value = decoder.decode(buffer);
//     const vtt = stringifyVtt(parse(value));
//     const blob = new Blob([vtt], {type : 'text/vtt'});
//     return {
//       kind: 'subtitles',
//       src: URL.createObjectURL(blob),
//       default: file.default,
//       srcLang: file.lang,
//       label: file.label,
//     };
//   } catch(e) {
//     console.log(e);
//   }
// };
//
//   static getDerivedStateFromProps(props, state) {
//
//     if(Array.isArray(props.medias)) {
//       return {media: props.medias[0]}
//     }
//
//     return {media: props.media};
//   }

  render() {
    const {medias, index} = this.props;
    return (
      <div className="d-flex flex-column streamer">
        <StreamVideo
          className="video"
          medias={medias}
          index={index}
        />
      </div>
    );
  }
}

export default Streamer
