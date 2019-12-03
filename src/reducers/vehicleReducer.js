import {
  SET_VEHICLES,
  SET_FIELD,
  SET_ALL_FIELDS,
  RESET_FORM,
  VEHICLE_DELETED_SUCCESS,
  VEHICLE_DELETED_ERROR,
  VEHICLE_SAVED_SUCCESS,
  SET_VEHICLES_ERROR,
  LOADING_VEHICLES,
} from '../actions/types';

const defaultState = {
  vehicles: [],
  vehicle: {
    id: 0,
    type: '',
    plate: '',
    model: '',
    entryDate: '',
    departureDate: '',
    color: '',
    images: [],
    status: false
  },
  isEdit: false,
  isLoadingVehicles: true,
  vehiclesErrorMessage: ''
}

export default function (state = defaultState, action) {
  let obj = {};
  switch (action.type) {
    case LOADING_VEHICLES:
      return Object.assign({}, state, { isLoadingVehicles: true });
    case SET_VEHICLES:
      obj = {
        vehicle: { ...defaultState['vehicle'] },
        vehicles: [...action.vehicles], isEdit: false, isLoadingVehicles: false
      };
      return Object.assign({}, state, obj);
    case SET_VEHICLES_ERROR:
      return Object.assign({}, state, { vehiclesErrorMessage: action.error });
    case SET_ALL_FIELDS:
      return Object.assign({}, state, { vehicle: { ...action.vehicle }, isEdit: true, isLoadingVehicles: false });
    case SET_FIELD:
      obj = { ...state['vehicle'] }
      obj[action.field] = action.value
      return Object.assign({}, state, { vehicle: obj });
    case VEHICLE_SAVED_SUCCESS:
      obj = {
        vehicle: { ...defaultState['vehicle'] }, isEdit: false, isLoadingVehicles: false
      };
      return Object.assign({}, state, obj);
    case VEHICLE_DELETED_SUCCESS:
      obj = {
        vehicle: { ...defaultState['vehicle'] },
        vehicles: [...action.vehicles], isEdit: false, isLoadingVehicles: false
      }
      return Object.assign({}, state, obj);
    case VEHICLE_DELETED_ERROR:
      return Object.assign({}, state, { vehiclesErrorDelete: action.error });;
    case RESET_FORM:
      obj = {
        vehicle: { ...defaultState['vehicle'] }, isEdit: false, isLoadingVehicles: false
      };
      return Object.assign({}, state, obj);
    default:
      return state;
  }
}
