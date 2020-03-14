import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import Login from "../routes/Login/Login";
import {connect} from 'react-redux';
import userActions from "../redux/users/actions";
import notificationActions from "../redux/notifications/actions";
import moment from 'moment';

export default function withAuth(BaseComponent) {
  class withAuthComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: true,
        loading: true,
      };
    }

    componentDidMount() {
      if(this.props.user) {
        this.setState({loading: false});
        return;
      }

      const token = localStorage.getItem('token');
      if(token) {
        try {
          const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
          if(moment().isAfter(moment.unix(decoded.exp))) {
            this.logout();
          } else {
            this.props.login(token, decoded.user);
          }
        } catch(e) {
          console.warn(e);
          this.logout();
        }
      } else {
        this.logout();
      }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if(!prevProps.loading && this.props.loading) {
        this.setState({loading: true});
      }

      if(prevProps.loading && !this.props.loading) {
        this.setState({loading: false});
        if(this.props.user && this.props.isLogin) {
          this.login();
        }
      }

      if(prevProps.isLogin && !this.props.isLogin) {
        this.logout(true);
      }

      if(!prevProps.errors && this.props.errors) {
        if(this.props.errors.data) {
          this.props.startToaster(this.props.errors.data);
        } else {
          console.warn(this.props.errors);
        }
        this.logout();
      }
    }

    logout = () => {
      this.setState({isLogin: false, loading: false});
    };

    login = () => {
      this.setState({isLogin: true, loading: false});
    };

    render() {
      const {loading, isLogin} = this.state;
      if(isLogin) {
        return (
          <BaseComponent
            {...this.props}
            globalLoading={loading}
          />
        );
      } else {
        return (
          <Login
            globalLoading={loading}
          />
        );
      }
    }
  }

  withAuthComponent.propTypes = {
    login: PropTypes.func,
    user: PropTypes.object,
    errors: PropTypes.object,
    isLogin: PropTypes.bool,
    loading: PropTypes.bool,
    startToaster: PropTypes.func,
  };

  return connect(
    (state) => ({
      user: state.user.user,
      errors: state.user.errors,
      isLogin: state.user.isLogin,
      loading: state.loading.loading,
    }),
    (dispatch) => ({
      login: (token, user) => dispatch(userActions.login(token, user)),
      startToaster: (data) => dispatch(notificationActions.start(data)),
    })
  )(withAuthComponent);
}
