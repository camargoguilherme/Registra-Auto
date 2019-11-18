import {
  SET_VEHICLES,
  SET_FIELD,
  SET_ALL_FIELDS,
  RESET_FORM,
  VEHICLE_DELETED_SUCCESS,
  VEHICLE_DELETED_ERROR,
  VEHICLE_SAVED_SUCCESS,
  VEHICLE_SAVED_ERROR,
} from '../actions/types';

const defaultState = {
  vehicles: [],
  vehicle: { 
    id: null,
    type: null,
    plate: null,
    model: null,
    entryDate: null,
    color: null,
    status: 'OPEN'
  }
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_VEHICLES:
      return Object.assign({}, state, { vehicles: [ ...action.vehicles ] });
    case SET_ALL_FIELDS:
      return Object.assign({}, state, { vehicle: { ...action.vehicle } });
    case SET_FIELD:
      let obj = { ...state['vehicle'] }
      obj[action.field] = action.value
      return Object.assign({}, state, { vehicle: obj });
    case VEHICLE_SAVED_SUCCESS:
      return state;
    case VEHICLE_DELETED_SUCCESS:
      return state;
    case VEHICLE_DELETED_ERROR:
      return action.error;
    case RESET_FORM:
      return state;
    default:
      return state;
  }
}
