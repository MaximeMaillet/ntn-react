import React, {Component} from 'react';
import Streamer from "../../components/Streamer/Streamer";

import './stream.scss'

class Stream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  selectFile = (file) => {
    this.setState({file});
  };

  render() {
    const {torrent} = this.props;
    const {file} = this.state;
    return (
      <div className="d-flex flex-row content content-stream">
        <section className="d-flex flex-column main-block block-stream-menu">
          {
            torrent.files.map((file, key) => {
              return <button key={key} className="btn btn-primary" onClick={() => this.selectFile(file)}>{file.name}</button>;
            })
          }
        </section>
        <section className="d-flex flex-column main-block block-stream-video">
          <Streamer file={file ? file : torrent.files.filter((f) => /\.mp4$/ig.exec(f.name))[0]} />
        </section>
      </div>
    );
  }
}

export default Stream