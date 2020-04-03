import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import shouldAuth from "../../../hoc/shouldAuth";
import TorrentEditForm from "../../../components/Forms/Forms/TorrentForm/TorrentEditForm";
import get from 'lodash.get';
import './torrent-edit.scss'
import MetaSearch from "../../../components/Meta/Search/MetaSearch";
import MetaSearchContainer from "../../../containers/meta-search/MetaSearchContainer";

class TorrentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torrent: props.torrent,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.torrent !== this.props.torrent) {
      this.setState({torrent: this.props.torrent});
    }
  }

  onSelectItem = (item) => {
    const newTorrent = {
      ...this.state.torrent,
      title: get(item,'title', this.state.title),
      release_date: get(item, 'release_date', this.state.release_date),
      poster: get(item, 'poster', this.state.poster),
      media_type: get(item, 'media_type', this.state.media_type),
      language: get(item, 'language', this.state.language),
      overview: get(item, 'overview', this.state.overview),
      runtime: get(item,'runtime', this.state.runtime),
      genres: get(item, 'genres', this.state.genres),
    };

    this.setState({torrent: newTorrent});
  };

  render() {
    const {torrent} = this.state;
    return (
      <section className="main-block block-content block-torrent-edit">
        <h1><FormattedMessage id="route.torrent.edit.h1" /></h1>
        <h2>{torrent.name}</h2>
        <div className="torrent-edit-content">
          <div className="torrent-edit-form">
            <TorrentEditForm
              torrent={torrent}
              onSubmitError={this.props.onSubmitError}
              onSubmitSuccess={this.props.onSubmitSuccess}
            />
          </div>
          <div className="torrent-edit-search">
            <MetaSearchContainer
              torrent={torrent}
              component={MetaSearch}
              onSelectItem={this.onSelectItem}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default shouldAuth(TorrentEdit);