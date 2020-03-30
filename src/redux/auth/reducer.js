import {TYPE} from './actions';
import {ROLES} from '../../libraries/roles';

const initialState = {
  errors: null,
  isLogin: false,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.FAIL:
      return {
        ...state,
        errors: actions.errors,
      };
    case TYPE.LOGIN:
      return {
        ...state,
        isLogin: actions.isLogin
      };
    case TYPE.LOADED:
      return {
        ...state,
        user: actions.user,
        errors: null,
      };
    case TYPE.ROLES:
      return {
        ...state,
        isAdmin: !!(actions.user.roles & ROLES.ADMIN),
      };
    default:
      return state;
  }
}
