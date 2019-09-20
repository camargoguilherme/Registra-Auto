import {
  SET_VEHICLES
} from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case SET_VEHICLES:
      console.log(action.vehicles);
      return action.vehicles;
    default:
      return state;
  }
}