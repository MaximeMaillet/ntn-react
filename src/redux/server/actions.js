import api from "../../libraries/api";

export const TYPE = {
  LOADED: 'serverReducer::loaded',
};

const loaded = (servers) => {
  return {
    type: TYPE.LOADED,
    servers,
  }
};

const get = () => {
  return async(dispatch) => {
    try {
      const servers = (await api('GET', '/servers')).data;
      dispatch(loaded(servers));
    } catch(e) {
      console.warn(e);
    }
  };
};

export default {
  get,
}