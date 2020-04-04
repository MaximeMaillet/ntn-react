import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PlayerLoading extends Component {
  render() {
    const {className} = this.props;
    return (
      <div className={`player-loading ${className}`}>
        Loading...
      </div>
    );
  }
}

PlayerLoading.defaultProps = {
  className: '',
};

PlayerLoading.propTypes = {
  className: PropTypes.string,
};

export default PlayerLoading
