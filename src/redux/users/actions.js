import api from '../../libraries/api';
import loadingActions from '../loading/actions';
import serverActions from '../server/actions';

export const TYPE = {
  FAIL: 'userReducer::fail',
  LOADED: 'userReducer::loaded',
};

export const fail = (errors) => ({
  type: TYPE.FAIL,
  errors,
});

export const loaded = (action, user) => ({
  type: TYPE.LOADED,
  action,
  user,
});

export const login = (token, user) => {
  return async(dispatch) => {
    localStorage.setItem('token', token);
    await dispatch(get(user.id));
    await dispatch(serverActions.get())
  };
};

export const logout = () => {
  return async(dispatch) => {
    localStorage.removeItem('token');
    await dispatch(loaded(null));
  };
};

export const get = (userId) => {
  return async(dispatch) => {
    try {
      dispatch(loadingActions.startLoading());
      const user = (await api('GET', `/users/${userId}`)).data;
      dispatch(loaded('get', user));
    } catch(e) {
      dispatch(fail(e));
    } finally {
      dispatch(loadingActions.stopLoading());
    }
  };
};

export default {
  login,
  logout,
  fail,
  loaded,
}