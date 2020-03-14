import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../errors.scss';
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";

class NotFound extends Component {
  render() {
    const {title, message, className} = this.props;
    return (
      <div
        className={`errors not-found ${className}`}
      >
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="actions">
          <Link to="/" className="btn btn-error">
            <FormattedMessage id="errors.links.home" />
          </Link>
        </div>
      </div>
    );
  }
}

NotFound.defaultProps = {
  className: '',
};

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NotFound;
