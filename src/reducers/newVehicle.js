import {
  SET_FIELD,
  VEHICLE_SAVED_SUCCESS,
  SET_ALL_FIELDS,
  RESET_FORM
} from '../actions/types';

const INITIAL_STATE = {
  id: null,
  plate: null,
  model: null,
  color: null,
  type: null,
  entryDate: null,
  status: 'OPEN',
  images: [{
    id: null,
    url: null
  }]
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FIELD:
      const clonedState = { ...state };
      clonedState[action.field] = action.value;
      console.log('clonedState', action.field +': '+ action.value)
      return clonedState;
    case VEHICLE_SAVED_SUCCESS:
      return INITIAL_STATE;
    case SET_ALL_FIELDS:
      return action.vehicle;
    case RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
}