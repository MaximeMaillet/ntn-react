import React, {Component} from 'react';
import Streamer from "../../../components/Streamer/Streamer";
import shouldAuth from "../../../hoc/shouldAuth";
import MetaDetail from "../../../components/Meta/Detail/MetaDetail";
import TorrentMedias from "../../../components/Torrents/Medias/TorrentMedias";

import './torrent-one.scss'
import StreamContainer from "../../../containers/stream/StreamContainer";

class TorrentOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamIndex: null,
    };
  }

  selectStream = (index) => {
    this.setState({streamIndex: index});
  };

  render() {
    const {torrent} = this.props;
    const {streamIndex} = this.state;
    return (
      <section className="main-block">
        <div className="torrent-one">
          <h1>{torrent.name}</h1>
          <div className="torrent-details">
            <div className="block-stream-menu">
              <MetaDetail
                className="torrent-details"
                {...torrent}
              />
              <TorrentMedias
                className="torrent-medias"
                torrent={torrent}
                indexStreamed={streamIndex}
                selectStream={this.selectStream}
              />
            </div>
            <div className="block-stream-video">
              <StreamContainer
                medias={torrent.medias}
                forceIndex={streamIndex}
                component={Streamer}
              />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default shouldAuth(TorrentOne);