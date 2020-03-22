import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";
import {LOADING} from "../../../config/const";

import './list.scss'
import withTorrents from "../../../hoc/withTorrents";
import TorrentList from '../../../components/Torrents/List/List';
import {Link} from "react-router-dom";

class List extends Component {
  componentDidMount() {
    this.props.loadTorrents();
  }

  render() {
    const {loading, torrents} = this.props;
    return (
      <div className={`content ${(loading & LOADING.TORRENTS) !== 0 ? 'is-loading' : ''}`}>
        <section className="d-flex flex-column main-block block-profile-list">
          <h1><FormattedMessage id="route.profile.create.h1" /></h1>
          <div className="d-flex ml-auto mb-1">
            <Link to="/torrents/add" className="btn btn-primary">Ajouter</Link>
          </div>
          <TorrentList
            loading={loading}
            torrents={torrents}
          />
        </section>
      </div>
    );
  }
}

List.propTypes = {
  profiles: PropTypes.array,
  loadProfiles: PropTypes.func,
};

export default withTorrents(List);
