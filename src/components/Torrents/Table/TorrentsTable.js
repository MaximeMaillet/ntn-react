import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Octet from "../../Octet/Octet";
import {FormattedMessage, injectIntl} from "react-intl";
import {Link} from "react-router-dom";

import './torrents-table.scss';

class TorrentsTable extends Component {
  render() {
    const {torrents, isAdmin, className} = this.props;
    return (
      <div className={`main-table main-table-primary table-torrents ${className}`}>
        <div className="row main-table-row  main-table-header">
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item state"><FormattedMessage id="component.torrents.table.item.title.state"/></div>
          <div className="col-4 col-sm-4 col-lg-4 col-xl-4 main-table-item name"><FormattedMessage id="component.torrents.table.item.title.name"/></div>
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item download octet"><FormattedMessage id="component.torrents.table.item.title.download"/></div>
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item upload octet"><FormattedMessage id="component.torrents.table.item.title.upload"/></div>
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item total octet"><FormattedMessage id="component.torrents.table.item.title.total"/></div>
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item ratio"><FormattedMessage id="component.torrents.table.item.title.ratio"/></div>
          <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item files"><FormattedMessage id="component.torrents.table.item.title.files"/></div>
          {isAdmin && <div className="col-1 col-sm-1 col-lg-2 col-xl-2 main-table-item actions"><FormattedMessage id="component.torrents.table.item.title.actions"/></div>}
        </div>
        {
          torrents.map((torrent, key) => {
            return (
              <div className="row main-table-row" key={key}>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item state">
                  <Link to={`/torrents/${torrent.id}`}><i className="fa fa-eye"/></Link>
                </div>
                <div className="col-4 col-sm-4 col-lg-4 col-xl-4 main-table-item name"><span>{torrent.name}</span></div>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item download octet"><Octet value={torrent.downloaded}/></div>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item upload octet"><Octet value={torrent.uploaded}/></div>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item total octet"><Octet value={torrent.total}/></div>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item ratio"><span>{torrent.ratio}</span></div>
                <div className="col-1 col-sm-1 col-lg-1 col-xl-1 main-table-item files">{torrent.medias.length}</div>
                {
                  isAdmin &&
                  <div className="col-2 col-sm-2 col-lg-2 col-xl-2 main-table-item actions">
                    {torrent.active ?
                      <button className="btn btn-sm btn-primary" onClick={() => this.props.pauseTorrent(torrent)}><i
                        className="fas fa-pause"/></button> : ''}
                    {torrent.active ?
                      <button className="btn btn-sm btn-primary" onClick={() => this.props.resumeTorrent(torrent)}><i
                        className="fas fa-play"/></button> : ''}
                    <button className="btn btn-sm btn-danger"><i className="fas fa-times"
                                                                 onClick={() => this.props.removeTorrent(torrent)}/>
                    </button>
                  </div>
                }
              </div>
            );
          })
        }
      </div>
    );
  }
}

TorrentsTable.defaultProps = {
  className: '',
};

TorrentsTable.propTypes = {
  className: PropTypes.string,
  torrents: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool,
};

export default connect(
  (state) => ({
    isAdmin: state.auth.isAdmin,
  }),
)(injectIntl(TorrentsTable));
