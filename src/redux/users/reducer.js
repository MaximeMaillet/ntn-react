import {TYPE} from './actions';
import {ROLES} from '../../libraries/roles';

const initialState = {
  errors: null,
  isLogin: true,
};

export default function(state = initialState, actions) {
  switch(actions.type) {
    case TYPE.LOGIN:
      return {
        ...state,
        isLogin: actions.isLogin,
      };
    case TYPE.FAIL:
      return {
        ...state,
        errors: actions.errors,
      };
    case TYPE.LOADED:
      return {
        ...state,
        user: actions.user,
        errors: null,
        isAdmin: actions.user ? !!(actions.user.roles & ROLES.ADMIN) : false,
      };
    default:
      return state;
  }
}
