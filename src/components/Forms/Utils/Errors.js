import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Errors extends Component {
  render() {
    const {meta} = this.props;
    if(meta.touched && (meta.error || meta.submitError)) {
      return (
        <div className="invalid-feedback">
          {meta.error || meta.submitError}
        </div>
      );
    }

    return null;
  }
}

Errors.propTypes = {
  meta: PropTypes.object.isRequired,
};

export default Errors;