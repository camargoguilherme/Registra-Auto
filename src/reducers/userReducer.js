import {
  USER_LOGIN_SUCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_SUCESS,
  USER_LOGOUT_ERROR,
  USER_FIND,
  USER_FIND_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  signed: false
}


export default function userReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_SUCESS:
      const userLogin = { ...action.user, signed: true }
      return userLogin;
    case USER_LOGIN_ERROR:
      return action.error;
    case USER_FIND:
      const userFinded = { ...action.user }
      return userFinded;
    case USER_FIND_ERROR:
      return action.error;
    case USER_LOGOUT_SUCESS:
      return INITIAL_STATE;
    case USER_LOGOUT_ERROR:
      return action.error;
    default:
      return state;
  }
} 