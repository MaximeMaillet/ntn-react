import {TYPE} from './actions';

const initialState = {
  loading: false,
  apiFail: false,
  errors: null,
  active: false,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.START:
      return {
        ...state,
        active: true,
        formatted: actions.formatted,
        style: actions.style,
      };
    case TYPE.STOP:
      return {
        ...state,
        active: false,
        formatted: null,
      };
    default:
      return state;
  }
}
