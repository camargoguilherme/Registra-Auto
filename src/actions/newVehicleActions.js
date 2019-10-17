import firebase from 'react-native-firebase';

import {
  SET_FIELD,
  VEHICLE_SAVED_SUCCESS,
  VEHICLE_SAVED_ERROR,
  SET_ALL_FIELDS,
  RESET_FORM
} from './types';

export const setField = (field, value) => {
  return {
    type: SET_FIELD,
    field,
    value
  }
}

export const vehicleSavedSuccess = () => {
  return {
    type: VEHICLE_SAVED_SUCCESS
  }
}

export const vehicleSavedError = (error) => {
  return {
    type: VEHICLE_SAVED_ERROR,
    error: error
  }
}

export const setAllFields = vehicle => ({
  type: SET_ALL_FIELDS,
  vehicle
});

export const resetForm = () => ({
  type: RESET_FORM
})

export const saveVehicle = (vehicle) => {
  const { currentUser } = firebase.auth();
  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}/vehicles/${vehicle['id']}`)
      .set(vehicle, function (error) {
        if (error) {
          console.log('saveVehicle Error: ', error);
          dispatch(vehicleSavedError(error));
        }
      });

    dispatch(vehicleSavedSuccess());
  }
}





