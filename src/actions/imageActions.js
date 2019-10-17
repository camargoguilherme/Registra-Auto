import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import strings from '../config/strings';

import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_COMPLETED,
  SET_IMAGE,
  DELETE_IMAGE
} from '../actions/types';

export const imageUploadSucess = (id, url) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  id,
  url
});

export const imageUploadError = error => ({
  type: IMAGE_UPLOAD_ERROR,
  error
});

export const imageUploadCompleted = percent => ({
  type: IMAGE_UPLOAD_COMPLETED,
  percent
});

export const setImage = (data) => {
  return {
    type: SET_IMAGE,
    data
  }
}

export const deleteImage = (id) => ({
  type: DELETE_IMAGE,
  id
});

export const processUpload = () => {

  // const { currentUser } = firebase.auth();
  // return dispatch => {
  //   firebase
  //     .database()
  //     .ref(`users/${currentUser.uid}/vehicles`)
  //     .on('value', snapshot => {
  //       const vehicles = snapshot.val();
  //       const action = setVehicles(vehicles);
  //       dispatch(action);
  //       return vehicles;
  //     })
  // }
}

