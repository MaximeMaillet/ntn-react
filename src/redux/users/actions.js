import api from '../../libraries/api';

export const TYPE = {
  LOADING: 'userReducer::loading',
  FAIL: 'userReducer::fail',
  LOADED: 'userReducer::loaded',
};

export const startLoading = () => ({
  type: TYPE.LOADING,
  loading: true,
});

export const stopLoading = () => ({
  type: TYPE.LOADING,
  loading: false,
});

export const fail = (errors) => ({
  type: TYPE.FAIL,
  errors,
});

export const loaded = (user) => ({
  type: TYPE.LOADED,
  user,
});

export const login = (token, user) => {
  return async(dispatch) => {
    localStorage.setItem('token', token);
    await dispatch(get(user.id));
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
      dispatch(startLoading());
      const user = (await api('GET', `/users/${userId}`)).data;
      dispatch(loaded(user));
    } catch(e) {
      dispatch(fail(e));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const update = (userId, data) => {
  return async(dispatch) => {
    try {
      dispatch(startLoading());
      const user = (await api('PATCH', `/users/${userId}`, data)).data;
      dispatch(loaded(user));
    } catch(e) {
      dispatch(fail(e));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export const updatePicture = (userId, picture) => {
  return async(dispatch) => {
    try {
      dispatch(startLoading());
      const user = (await api('PATCH', `/users/${userId}/picture`, picture, {'Content-Type': ''})).data;
      dispatch(loaded(user));
    } catch(e) {
      dispatch(fail(e));
    } finally {
      dispatch(stopLoading());
    }
  };
};

export default {
  login,
  logout,
  update,
  updatePicture,
}