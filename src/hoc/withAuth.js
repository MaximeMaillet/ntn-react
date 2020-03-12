import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken';
import Login from "../routes/Login/Login";
import {connect} from 'react-redux';
import userActions from "../redux/users/actions";
const moment = require('moment');

export default function withAuth(BaseComponent) {
  class withAuthComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
        loading: true,
      };
    }

    static getDerivedStateFromProps(props) {
      if(props.user) {
        return {isLogin: true, loading: false};
      }

      if(!props.user) {
        return {isLogin: false, loading: false};
      }
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      if(token) {
        try {
          const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
          if(moment().isAfter(moment.unix(decoded.exp))) {
            this.setState({isLogin: false, loading: false});
          } else {
            this.props.login(token, decoded.user);
          }
        } catch(e) {
          console.warn(e);
          this.setState({isLogin: false, loading: false});
        }
      } else {
        this.setState({isLogin: false, loading: false});
      }
    }

    render() {
      const {loading, isLogin} = this.state;
      if(loading) {
        return null;
      }

      if(isLogin) {
        return (<BaseComponent {...this.props} />);
      } else {
        return <Login/>;
      }
    }
  }

  withAuthComponent.propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
  };

  return connect(
    (state) => ({
      user: state.user.user,
    }),
    (dispatch) => ({
      login: (token, user) => dispatch(userActions.login(token, user)),
    })
  )(withRouter(withAuthComponent));
}
