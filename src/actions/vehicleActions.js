import firebase from 'react-native-firebase';
import {
  SET_VEHICLES,
  SET_VEHICLES_ERROR
} from './types';

const setVehicles = vehicles => ({
  type: SET_VEHICLES,
  vehicles: vehicles
})

const setVehiclesError = error => ({
  type: SET_VEHICLES_ERROR,
  error: error
})

export const watchVehicles = () => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .child('vehicles')
      .on('value', snapshot => {
        console.log('watchVehicles: ', snapshot.val())
        dispatch(setVehicles(snapshot.val()));
      }, function (errorObject) {
        console.log("The read failed: ", errorObjec);
        dispatch(setVehiclesError(errorObjec))
      })
  }
}