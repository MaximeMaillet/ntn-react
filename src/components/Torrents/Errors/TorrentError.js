import React, {Component} from "react";
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

import './torrent-error.scss';

class TorrentError extends Component {
  render() {
    const {className} = this.props;
    return (
      <div className={`generic-torrent-background generic-torrent-error ${className}`}>
        <div className="error">
          <h3><FormattedMessage id="component.torrents.error_happened" /></h3>
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  }
}

TorrentError.propTypes = {
  message: PropTypes.string.isRequired,
};

TorrentError.defaultProps = {
  className: '',
};

export default TorrentError;