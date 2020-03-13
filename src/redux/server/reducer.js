import {TYPE} from './actions';

const initialState = {
  servers: [],
  current: null,
};

export default function(state = initialState, actions) {
  if(actions.type === TYPE.LOADED) {
    return {
      ...state,
      servers: actions.servers,
      current: state.current ? state.current : actions.servers[0],
    };
  }

  return state;
}
