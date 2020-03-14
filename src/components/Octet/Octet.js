import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Octet extends Component {
  transformValueOctet = (value) => {
    if(value > (1024*1024*1024)) {
      return Math.floor((value/(1024*1024*1024))* 100) / 100;
    } else if(value > (1024*1024)) {
      return Math.floor((value/(1024*1024))* 100) / 100;
    } else if(value > 1024) {
      return Math.floor((value/1024)* 100) / 100;
    }

    return value;
  };

  getMeasure = (value) => {
    if(value > (1024*1024*1024)) {
      return 'Go';
    } else if(value > (1024*1024)) {
      return 'Mo';
    } else if(value > 1024) {
      return 'Ko';
    }

    return 'octet';
  };

  render() {
    const {className, value} = this.props;

    return (
      <div className={`octet ${className}`}>
        <span>{this.transformValueOctet(value)}</span> {this.getMeasure(value)}
      </div>
    );
  }
}

Octet.defaultProps = {
  className: '',
};

Octet.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default Octet;
