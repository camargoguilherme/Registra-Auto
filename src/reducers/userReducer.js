import {
  USER_LOGIN_SUCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_SUCESS,
  USER_LOGOUT_ERROR
} from '../actions/types';

export default function userReducers(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCESS:
      return action.user;
    case USER_LOGIN_ERROR:
      return action.error;
    case USER_LOGOUT_SUCESS:
      return null;
    case USER_LOGOUT_ERROR:
      return action.error;
    default:
      return state;
  }
} 