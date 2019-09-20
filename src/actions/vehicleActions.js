import firebase from 'react-native-firebase';
import { SET_VEHICLES } from './types';

const setVehicles = vehicles => ({
  type: SET_VEHICLES,
  vehicles: vehicles
})

export const watchVehicles = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/vehicles`)
      .on('value', snapshot => {
        const vehicles = snapshot.val();
        const action = setVehicles(vehicles);
        dispatch(action);
      })
  }
}