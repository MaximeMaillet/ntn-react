import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

import './media-type.scss'

class MediaType extends Component {
  render() {
    const {media_type, className} = this.props;
    let strMediaType, icon;
    console.log('---')
    console.log(media_type);
    switch(media_type) {
      case 'tv':
        icon = <i className="fa fa-tv" />;
        strMediaType = <FormattedMessage id="component.torrents.media_type.tv_show" />;
        break;
      case 'movie':
        icon = <i className="fa fa-film" />;
        strMediaType = <FormattedMessage id="component.torrents.media_type.movie" />;
        break;
      default:
        icon = <i className="fa fa-band-aid" />;
        strMediaType = <FormattedMessage id="component.torrents.media_type.unknown" />;
        return
    }
    return (
      <div className={`media-type ${media_type} ${className}`}>
        <span>{icon}</span>
        {strMediaType}
      </div>
    );
  }
}

MediaType.propTypes = {
  className: PropTypes.string,
  media_type: PropTypes.string,
};

export default MediaType;
