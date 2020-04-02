import React, {Component} from 'react';
import {FormattedMessage} from "react-intl";
import shouldAuth from "../../../hoc/shouldAuth";
import {LOADING} from "../../../config/const";
import TorrentEditForm from "../../../components/Forms/Forms/TorrentForm/TorrentEditForm";

import './torrent-edit.scss'

class TorrentEdit extends Component {
  render() {
    const {loading, torrent} = this.props;
    return (
      <section className={`main-block block-content block-torrent-edit ${loading & LOADING.FORM_TORRENT ? 'is-loading' : ''}`}>
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
          </div>
        </div>
      </section>
    );
  }
}

export default shouldAuth(TorrentEdit);