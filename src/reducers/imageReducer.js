import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_COMPLETED,
  SET_IMAGE,
  DELETE_IMAGE
} from '../actions/types';

const defaultState = {
  images: [],
  percent: null,
  data: null
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case SET_IMAGE:
      let image = { id: action.id, url: action.url }
      return Object.assign({}, state, { images: [...state.images, image] });
    default:
      return state;
  }
}
