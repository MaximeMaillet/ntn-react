import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Overview extends Component {
  render() {
    const {text, length} = this.props;
    if(text.length > length) {
      return <div className="overview">{`${text.substring(0, length)}...`}</div>
    } else {
      return <div className="overview">
        {text}
      </div>;
    }
  }
}

Overview.defaultProps = {
  className: '',
  length: 250,
};

Overview.propsTypes = {
  className: PropTypes.string,
  length: PropTypes.number,
  text: PropTypes.string,
};

export default Overview;
