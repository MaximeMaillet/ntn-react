import {TYPE} from './actions';

const initialState = {
  loading: false,
  apiFail: false,
  errors: null,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.START:
      return {
        ...state,
        notification: actions.notification,
      };
    case TYPE.STOP:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
}
