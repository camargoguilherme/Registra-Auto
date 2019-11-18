import { combineReducers } from 'redux';
import userReducer from './userReducer';
import vehicleReducer from './vehicleReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  user: userReducer,
  vehicle: vehicleReducer,
  image: imageReducer
});