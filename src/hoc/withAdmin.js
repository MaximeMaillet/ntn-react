import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Forbidden from "../components/Errors/Forbidden/Forbidden";

export default function withAdmin(BaseComponent) {
  class withAdminComponent extends React.PureComponent {
    render() {
      if(this.props.isAdmin) {
        return (<BaseComponent {...this.props} />);
      } else {
        return <Forbidden />;
      }
    }
  }

  withAdminComponent.propTypes = {
    isAdmin: PropTypes.bool,
  };

  return connect(
    (state) => ({
      isAdmin: state.auth.isAdmin,
    })
  )(withAdminComponent);
}
