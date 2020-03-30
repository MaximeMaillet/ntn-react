import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {FormattedMessage} from "react-intl";

class ReleaseDate extends Component {
  render() {
    const {date} = this.props;
    if(date) {
      return (
        <div className="release-date">
          {moment(date).format('YYYY')}
        </div>
      );
    } else {
      return (
        <div className="release-date unknown">
          <FormattedMessage id="component.torrents.release_date.unknown" />
        </div>
      );
    }

  }
}

ReleaseDate.propsTypes = {
  className: PropTypes.string,
  date: PropTypes.date,
};

export default ReleaseDate;
