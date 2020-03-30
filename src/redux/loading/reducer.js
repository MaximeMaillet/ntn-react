import {TYPE} from './actions';

const initialState = {
  loading: 0,
};

export default function(state = initialState, actions) {
  if(actions.type === TYPE.START) {
    return {
      ...state,
      loading: state.loading | actions.loading,
    };
  } else if(actions.type === TYPE.STOP) {
    return {
      ...state,
      loading: state.loading & ~actions.loading,
    };
  }

  return state;
}
