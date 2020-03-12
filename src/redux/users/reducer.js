import {TYPE} from './actions';

const initialState = {
  loading: false,
  apiFail: false,
  errors: null,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.LOADING:
      return {
        ...state,
        loading: actions.loading,
        apiFail: actions.loading ? false : state.apiFail,
        errors: actions.loading ? null : state.errors,
      };
    case TYPE.FAIL:
      return {
        ...state,
        errors: actions.errors,
        apiFail: true,
      };
    case TYPE.LOADED:
      return {
        ...state,
        user: actions.user,
      };
    default:
      return state;
  }
}
