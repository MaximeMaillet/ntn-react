import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

import '../generic-torrent.scss';

export class TorrentLoading extends Component {
  render() {
    const {className} = this.props;
    return (
      <div className={`generic-torrent-background generic-torrent-loading ${className}`}>
        <div className="details">
          <FormattedMessage id="component.torrents.list.loading" />
        </div>
      </div>
    );
  }
}

TorrentLoading.defaultProps = {
  className: '',
};

TorrentLoading.propTypes = {
  className: PropTypes.string,
};

export default TorrentLoading;
