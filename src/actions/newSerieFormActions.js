import firebase from 'react-native-firebase';

import {
  SET_FIELD,
  SERIE_SAVED_SUCCESS,
  SET_ALL_FIELDS,
  RESET_FORM
} from '../actions/types';



export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  }
}


export const serieSavedSuccess = () => {
  return {
    type: SERIE_SAVED_SUCCESS
  }
}


export const setAllFields = serie => ({
  type: SET_ALL_FIELDS,
  serie: serie
});


export const resetForm = () => ({
  type: RESET_FORM
})

export const saveSerie = serie => {
  const { currentUser } = firebase.auth();

  return async dispatch => {
    await firebase
      .database()
      .ref(`/users/${currentUser.uid}/series`)
      .push(serie);

    dispatch(serieSavedSuccess());
  }
}





