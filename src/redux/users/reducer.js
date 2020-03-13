import {TYPE} from './actions';
import {ROLES} from '../../libraries/roles';

const initialState = {
  errors: null,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.FAIL:
      return {
        ...state,
        errors: actions.errors,
      };
    case TYPE.LOADED:
      return {
        ...state,
        action: actions.action,
        user: actions.user,
        errors: null,
        isAdmin: actions.user ? !!(actions.user.roles & ROLES.ADMIN) : false,
      };
    default:
      return state;
  }
}
