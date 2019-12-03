import { auth, database } from 'react-native-firebase';

const { currentUser } = auth();

import {
  LOADING_VEHICLES,
  RESET_FORM,
  SET_VEHICLES,
  SET_VEHICLES_ERROR,
  SET_FIELD,
  SET_ALL_FIELDS,
  VEHICLE_SAVED_SUCCESS,
  VEHICLE_SAVED_ERROR,
  VEHICLE_DELETED_SUCCESS,
  VEHICLE_DELETED_ERROR,
} from './types';

const loadingVehicles = () => {
  console.log('loadingVehicles')
  return {
    type: LOADING_VEHICLES
  }
};

const setVehicles = vehicles => {
  console.log('setVehicles', vehicles)
  return {
    type: SET_VEHICLES,
    vehicles: vehicles
  }
};

const setVehiclesError = error => {
  console.log('setVehiclesError', error)
  return {
    type: SET_VEHICLES_ERROR,
    error: error
  }
};

export const setField = (field, value) => {
  console.log('setField', 'field: ' + field, 'value: ' + value)
  return {
    type: SET_FIELD,
    field,
    value
  }
};

export const vehicleSavedSuccess = () => {
  console.log('vehicleSavedSuccess')
  return {
    type: VEHICLE_SAVED_SUCCESS
  }
};

export const vehicleSavedError = (error) => {
  console.log('vehicleSavedError', error)
  return {
    type: VEHICLE_SAVED_ERROR,
    error: error
  }
};

export const vehicleDeletedSuccess = () => {
  console.log('vehicleDeletedSuccess')
  return {
    type: VEHICLE_DELETED_SUCCESS
  }
};

export const vehicleDeletedError = (error) => {
  console.log('vehicleDeletedError', error)
  return {
    type: VEHICLE_DELETED_ERROR,
    error: error
  }
};

export const setAllFields = vehicle => {
  console.log('setAllFields', vehicle)
  return {
    type: SET_ALL_FIELDS,
    vehicle
  }
};

export const resetForm = () => {
  console.log('resetForm')
  return {
    type: RESET_FORM
  }
};

export const deleteVehicle = (idVehicle) => {
  return async dispatch => {
    await database()
      .ref(`users/${currentUser.uid}/vehicles/${idVehicle}`)
      .remove(
        function (error) {
          if (error) {
            console.log('deleteVehicle Error: ', error);
            dispatch(vehicleDeletedError(error));
          }
        });
    loadingVehicles();
    dispatch(vehicleDeletedSuccess());
  }
}

export const saveVehicle = (vehicle) => {
  return async dispatch => {
    await database()
      .ref(`users/${currentUser.uid}/vehicles/${vehicle['id']}`)
      .set(vehicle, function (error) {
        if (error) {
          dispatch(vehicleSavedError(error));
        }
      });
    dispatch(vehicleSavedSuccess());
  }
}

export const watchVehicles = () => {
  loadingVehicles();
  return dispatch => {
    database()
      .ref(`users/${currentUser.uid}`)
      .child('vehicles')
      .on('value', snapshot => {
        let vehicles = []
        snapshot.forEach(function (data) {
          vehicles.push(data.val())
        });
        dispatch(setVehicles(vehicles));
      }, function (errorObject) {
        console.log("The read failed: ", errorObject);
        dispatch(setVehiclesError(errorObject))
      })
  }
}
