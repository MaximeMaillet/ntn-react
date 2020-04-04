import api from '../../libraries/api';
import loadingActions from '../loading/actions';
import {LOADING} from "../../config/const";
import jwt from "jsonwebtoken";
import moment from "moment";

export const TYPE = {
  FAIL: 'userReducer::fail',
  LOADED: 'userReducer::loaded',
  LOGIN: 'userReducer::login',
  ROLES: 'userReducer::roles',
};

const fail = (errors) => ({
  type: TYPE.FAIL,
  errors,
});

const loaded = (user) => ({
  type: TYPE.LOADED,
  user,
});

const doRoles = (user) => ({
  type: TYPE.ROLES,
  user,
});

const doLogin = (isLogin) => ({
  type: TYPE.LOGIN,
  isLogin,
});

const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(loaded(null));
    dispatch(doLogin(false));
  }
};

const login = (token) => {
  return dispatch => {
    try {
      const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      if(moment().isAfter(moment.unix(decoded.exp))) {
        dispatch(logout());
      } else {
        localStorage.setItem('token', token);
        dispatch(loaded(decoded.user));
        dispatch(doRoles(decoded.user));
        dispatch(doLogin(true));
        dispatch(get(decoded.user.id));
      }
    } catch(e) {
      console.warn(e);
      dispatch(logout());
    }
  };
};

const get = (userId) => {
  return async(dispatch) => {
    try {
      dispatch(loadingActions.startLoading(LOADING.FULL));
      const user = (await api('GET', `/users/${userId}`)).data;
      await dispatch(loaded(user));
    } catch(e) {
      await dispatch(fail(e));
    } finally {
      dispatch(loadingActions.stopLoading(LOADING.FULL));
    }
  };
};

export default {
  login,
  logout,
}