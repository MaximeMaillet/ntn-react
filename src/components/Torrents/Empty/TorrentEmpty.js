import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import PropTypes from 'prop-types';

import '../generic-torrent.scss';

class TorrentEmpty extends Component {
  render() {
    const {className} = this.props;
    return (
      <div className={`generic-torrent-background generic-torrent-empty ${className}`}>
        <div className="details">
          <FormattedMessage id="component.torrents.list.empty" />
        </div>
      </div>
    );
  }
}

TorrentEmpty.defaultProps = {
  className: '',
};

TorrentEmpty.propsType = {
  className: PropTypes.string,
};

export default TorrentEmpty;