import {
  IMAGE_UPLOAD_SUCCESS,
  SET_IMAGE,
  REMOVE_IMAGE,
  RESET_IMAGES,
  SET_ALL_IMAGE,
} from '../actions/types';

const defaultState = {
  images: []
}

export default function (state = defaultState, action) {
  let images = []
  switch (action.type) {
    case SET_IMAGE:
      let image = { id: action.id, url: action.url };
      if (Array.isArray(state['images']) && state['images'].length)
        images = [...state['images'].filter(item => !!item)];
      images.push(image);
      return Object.assign({}, state, { images: images });
    case SET_ALL_IMAGE:
      images = action.images;
      if (Array.isArray(state['images']) && state['images'].length)
        images = [...state['images'].filter(item => !!item)];
      return Object.assign({}, state, { images: images });
    case IMAGE_UPLOAD_SUCCESS:
      images = action.images
      if (Array.isArray(state['images']) && state['images'].length)
        images = [...state['images'].filter(item => !!item)];
      images.push(image);
      return Object.assign({}, state, { images: images });
    case REMOVE_IMAGE:
      if (Array.isArray(state['images']) && state['images'].length)
        images = state['images'].filter(item => item && (item.id !== action.id));
      return Object.assign({}, state, { images: images });
    case RESET_IMAGES:
      return Object.assign({}, state, { images: [] });
    default:
      return state
  }
}
