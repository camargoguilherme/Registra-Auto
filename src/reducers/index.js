import { combineReducers } from 'redux';
import userReducer from './userReducer';
import newVehicle from './newVehicle';
import vehicleReducer from './vehicleReducer';

export default combineReducers({
  user: userReducer,
  vehicleForm: newVehicle,
  listVehicle: vehicleReducer,
});