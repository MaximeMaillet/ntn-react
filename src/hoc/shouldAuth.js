import React from 'react';
import PropTypes from 'prop-types';
import Login from "../routes/Login/Login";
import {connect} from 'react-redux';
import authActions from "../redux/auth/actions";
import loadingActions from "../redux/loading/actions";
import {LOADING} from '../config/const';
import WaitingConnexion from "../routes/Login/WaitingConnexion";

export default function shouldAuth(BaseComponent) {
  class withAuthComponent extends React.PureComponent {
    componentDidMount() {
      this.checkLogin();
    }

    checkLogin = async() => {
      this.props.startLoading(LOADING.FULL);
      const token = localStorage.getItem('token');
      if(!token) {
        this.props.logout();
        this.props.stopLoading(LOADING.FULL);
        return;
      }

      if(!this.props.isLogin) {
        this.props.login(token);
      }
      this.props.stopLoading(LOADING.FULL);
    };

    render() {
      const {isLogin, loading} = this.props;
      if(isLogin) {
        return (
          <BaseComponent
            {...this.props}
          />
        );
      } else {
        if(loading & LOADING.FULL) {
          return <WaitingConnexion />;
        }

        return (
          <Login
            {...this.props}
            login={this.login}
            logout={this.logout}
          />
        );
      }
    }
  }

  withAuthComponent.propTypes = {
    isLogin: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    startLoading: PropTypes.func,
    stopLoading: PropTypes.func,
  };

  return connect(
    (state) => ({
      isLogin: state.auth.isLogin,
      loading: state.loading.loading,
    }),
    (dispatch) => ({
      login: (token) => dispatch(authActions.login(token)),
      logout: () => dispatch(authActions.logout()),
      startLoading: (type) => dispatch(loadingActions.startLoading(type)),
      stopLoading: (type) => dispatch(loadingActions.stopLoading(type)),
    })
  )(withAuthComponent);
}
