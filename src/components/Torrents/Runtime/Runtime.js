import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from "react-intl";

class Runtime extends Component {
  render() {
    const {runtime} = this.props;
    if(runtime) {
      return (
        <div className="runtime">
          {`${runtime}min`}
        </div>
      );
    } else {
      return (
        <div className="runtime unknown">
          <FormattedMessage id="component.torrents.runtime.unknown"/>
        </div>
      );
    }
  }
}

Runtime.propsTypes = {
  className: PropTypes.string,
  runtime: PropTypes.number,
};

export default Runtime;
