import {
  SET_VEHICLES,
  DELETE_VEHICLE
} from '../actions/types';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_VEHICLES:
      return action.vehicles;
    case DELETE_VEHICLE:
      return action.vehicles;
    default:
      return state;
  }
}