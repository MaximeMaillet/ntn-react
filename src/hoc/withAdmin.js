import React from 'react';
import PropTypes from 'prop-types';
import Login from "../routes/Login/Login";
import {connect} from 'react-redux';

export default function withAdmin(BaseComponent) {
  class withAdminComponent extends React.PureComponent {
    render() {
      if(this.props.isAdmin) {
        return (<BaseComponent {...this.props} />);
      } else {
        return <Login/>;
      }
    }
  }

  withAdminComponent.propTypes = {
    isAdmin: PropTypes.bool,
  };

  return connect(
    (state) => ({
      isAdmin: state.user.isAdmin,
    })
  )(withAdminComponent);
}
