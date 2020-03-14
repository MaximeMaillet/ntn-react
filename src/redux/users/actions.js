import api from '../../libraries/api';
import loadingActions from '../loading/actions';
import serverActions from '../server/actions';

export const TYPE = {
  FAIL: 'userReducer::fail',
  LOADED: 'userReducer::loaded',
  LOGIN: 'userReducer::login',
};

export const fail = (errors) => ({
  type: TYPE.FAIL,
  errors,
});

export const loaded = (user) => ({
  type: TYPE.LOADED,
  user,
});

export const doLogin = (isLogin) => ({
  type: TYPE.LOGIN,
  isLogin,
});

export const login = (token, user) => {
  return async(dispatch) => {
    localStorage.setItem('token', token);
    dispatch(loaded(user));
    await dispatch(get(user.id));
    await dispatch(serverActions.get());
  };
};

export const logout = () => {
  return async(dispatch) => {
    localStorage.removeItem('token');
    await dispatch(loaded(null));
    await dispatch(doLogin(false));
  };
};

export const get = (userId) => {
  return async(dispatch) => {
    try {
      dispatch(loadingActions.startLoading());
      const user = (await api('GET', `/users/${userId}`)).data;
      await dispatch(loaded(user));
      await dispatch(doLogin(true));
    } catch(e) {
      dispatch(fail(e));
      await dispatch(doLogin(false));
    } finally {
      dispatch(loadingActions.stopLoading());
    }
  };
};

export default {
  login,
  logout,
  fail,
}