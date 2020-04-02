import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import get from 'lodash.get';
import Forbidden from "../components/Errors/Forbidden/Forbidden";

export default function shouldOwner(BaseComponent, target) {
  class shouldOwnerComponent extends React.PureComponent {
    render() {
      if(!this.props.isAdmin && this.props.user.id !== get(this.props, target, null)) {
        return <Forbidden/>
      }

      return (
        <BaseComponent
          {...this.props}
        />
      );
    }
  }

  shouldOwnerComponent.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };

  return connect(
    (state) => ({
      user: state.auth.user,
      isAdmin: state.auth.isAdmin,
    })
  )(shouldOwnerComponent);
}
