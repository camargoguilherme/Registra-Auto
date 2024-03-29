import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import strings from '../config/strings';

import {
  USER_LOGIN_SUCESS,
  USER_LOGIN_ERROR,
  USER_SIGNUP_SUCESS,
  USER_SIGNUP_ERROR,
  USER_LOGOUT_SUCESS,
  USER_LOGOUT_ERROR,
  USER_FIND,
  USER_FIND_ERROR
} from '../actions/types';

const userLoginSucess = user => ({
  type: USER_LOGIN_SUCESS,
  user
});

const userLoginError = error => ({
  type: USER_LOGIN_ERROR,
  error
});

const userSignupSucess = user => ({
  type: USER_SIGNUP_SUCESS,
  user
});

const userSignupError = error => ({
  type: USER_SIGNUP_ERROR,
  error
});

const userLogoutSucess = () => ({
  type: USER_LOGOUT_SUCESS,
});

const userLogoutError = error => ({
  type: USER_LOGOUT_ERROR,
  error
});

const userFind = (user) => ({
  type: USER_FIND,
  user
});

const userFindError = error => ({
  type: USER_FIND_ERROR,
  error
});

export const repairUser = (user) => dispatch => {
  const action = userFind(user)
  dispatch(action);
  return Promise.resolve(user);
}

export const processLogin = ({ email, password }) => dispatch => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      AsyncStorage.setItem('@user', JSON.stringify(user))
      const action = userLoginSucess(user);
      dispatch(action);
      return user;
    })
    .catch(error => {
      const action = userLoginError(error);
      dispatch(action);
      return Promise.reject(error);
    })
}

export const processSignup = ({ email, password }) => dispatch => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      const action = userSignupSucess(user);
      dispatch(action);
      return user;
    })
    .catch(error => {
      const action = userSignupError(error);
      dispatch(action);
      return Promise.reject(error);
    })
}

export const processLogout = () => dispatch => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const action = userLogoutSucess();
      dispatch(action);
      return
    })
    .catch(error => {
      const action = userLogoutError(error);
      dispatch(action);
      return Promise.reject(error);
    })
}