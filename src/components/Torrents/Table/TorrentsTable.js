import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Octet from "../../Octet/Octet";
import {FormattedMessage, injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import {LOADING} from '../../../config/const';

import withTorrents from "../../../hoc/withTorrents";

import './torrents-table.scss';

class TorrentsTable extends Component {
  componentDidMount() {
    this.props.loadTorrents();
  }

  render() {
    const {torrents, torrentError, loading, isAdmin} = this.props;
    return (
      <table className="main-table torrents-table">
        <thead className="main-table-row  main-table-header">
          <th className="main-table-item state"><FormattedMessage id="component.torrents.table.item.title.state"/></th>
          <th className="main-table-item name"><FormattedMessage id="component.torrents.table.item.title.name"/></th>
          <th className="main-table-item download octet"><FormattedMessage id="component.torrents.table.item.title.download"/></th>
          <th className="main-table-item upload octet"><FormattedMessage id="component.torrents.table.item.title.upload"/></th>
          <th className="main-table-item total octet"><FormattedMessage id="component.torrents.table.item.title.total"/></th>
          <th className="main-table-item ratio"><FormattedMessage id="component.torrents.table.item.title.ratio"/></th>
          <th className="main-table-item files"><FormattedMessage id="component.torrents.table.item.title.files"/></th>
          {isAdmin && <th className="item actions"><FormattedMessage id="component.torrents.table.item.title.actions"/></th>}
        </thead>
        {
          (loading & LOADING.TORRENTS) ?
            <tr className="main-table-loading">
              <td colSpan={8} className="main-table-item">
                <FormattedMessage id="component.torrents.table.loading"/>
              </td>
            </tr>
          :
            (torrentError) ?
              <tr className="main-table-error">
                <td colSpan={8} className="main-table-item">
                  <h3><FormattedMessage id="component.torrents.error_happened"/></h3>
                  <p>{torrentError.message}</p>
                </td>
              </tr>
            :
              (!torrents || torrents.length === 0) ?
                <tr className="main-table-empty">
                  <td colSpan={8} className="main-table-item">
                    <FormattedMessage id="component.torrents.table.empty"/>
                  </td>
                </tr>
              :
                torrents.map((torrent, key) => {
                  return (
                    <tr className="main-table-row" key={key}>
                      <td className="main-table-item state">
                        <Link to={`/torrents/${torrent.id}`}><i className="fa fa-eye"/></Link>
                      </td>
                      <td className="main-table-item name">
                        <span>{torrent.name}</span>
                      </td>
                      <td className="main-table-item download octet"><Octet value={torrent.downloaded}/></td>
                      <td className="main-table-item upload octet"><Octet value={torrent.uploaded}/></td>
                      <td className="main-table-item total octet"><Octet value={torrent.total}/></td>
                      <td className="main-table-item ratio">{torrent.ratio}</td>
                      <td className="main-table-item files">{torrent.medias.length}</td>
                      {
                        isAdmin &&
                        <td className="main-table-item actions">
                          {torrent.active ?
                            <button className="btn btn-sm btn-primary" onClick={() => this.props.pauseTorrent(torrent)}><i
                              className="fas fa-pause"/></button> : ''}
                          {torrent.active ?
                            <button className="btn btn-sm btn-primary" onClick={() => this.props.resumeTorrent(torrent)}><i
                              className="fas fa-play"/></button> : ''}
                          <button className="btn btn-sm btn-danger"><i className="fas fa-times"
                                                                       onClick={() => this.props.removeTorrent(torrent)}/>
                          </button>
                        </td>
                      }
                    </tr>
                  );
                })
        }
      </table>
    );
  }
}

TorrentsTable.propTypes = {
  torrents: PropTypes.array,
  loading: PropTypes.number,
  isAdmin: PropTypes.bool,
};

export default connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
    loading: state.loading.loading,
  }),
)(injectIntl(withTorrents(TorrentsTable)));
