import {TYPE} from './actions';

const initialState = {
  loading: false,
};

export default function(state = initialState, actions) {
  if(actions.type === TYPE.LOADING) {
    return {
      ...state,
      loading: actions.loading,
    };
  }

  return state;
}
