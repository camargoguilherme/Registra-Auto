import { combineReducers } from 'redux';
import userReducer from './userReducer';
import vehicleReducer from './vehicleReducer';
import imagesReducer from './imageReducer';
import imageReducer from './imageReducer';

export default combineReducers({
  user: userReducer,
  vehicle: vehicleReducer,
  images: imageReducer
});