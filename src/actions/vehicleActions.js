import firebase from 'react-native-firebase';
import {
  SET_VEHICLES,
  SET_VEHICLES_ERROR,
  SET_FIELD,
  SET_ALL_FIELDS,
  RESET_FORM,
  VEHICLE_SAVED_SUCCESS,
  VEHICLE_SAVED_ERROR,
  VEHICLE_DELETED_SUCCESS,
  VEHICLE_DELETED_ERROR
} from './types';

const setVehicles = vehicles => ({
  type: SET_VEHICLES,
  vehicles: vehicles
})

const setVehiclesError = error => ({
  type: SET_VEHICLES_ERROR,
  error: error
})

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

export const vehicleDeletedSuccess = () => {
  return {
    type: VEHICLE_DELETED_SUCCESS
  }
}

export const vehicleDeletedError = (error) => {
  return {
    type: VEHICLE_DELETED_ERROR,
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

export const deleteVehicle = (vehicle) => {
  const { currentUser } = firebase.auth();
  return async dispatch => {
    await firebase
      .database()
      .ref(`users/${currentUser.uid}/vehicles/${vehicle['id']}`)
      .remove(
        function (error) {
          if (error) {
            console.log('deleteVehicle Error: ', error);
            dispatch(vehicleDeletedError(error));
          }
        });
    dispatch(vehicleDeletedSuccess());
  }
}

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

export const watchVehicles = () => {
  return dispatch => {
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .child('vehicles')
      .on('value', snapshot => {
        const vehicles = []
        snapshot.forEach(function (data) {
          vehicles.push(data.val())
        });
        // console.log("watchVehicles: ", vehicles);
        dispatch(setVehicles(vehicles));
      }, function (errorObject) {
        console.log("The read failed: ", errorObject);
        dispatch(setVehiclesError(errorObject))
      })
  }
}