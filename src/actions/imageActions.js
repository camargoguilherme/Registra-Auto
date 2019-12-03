import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { storage } from 'react-native-firebase';
import { translate } from '../locales';
import time from '../util/time';
import constants from '../config/constants';

const EXTENTION = 'jpeg'

import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_COMPLETED,
  SET_IMAGE,
  SET_ALL_IMAGE,
  REMOVE_IMAGE,
  RESET_IMAGES
} from './types';


export const imageUploadSucess = (images) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  images: images
});

export const imageUploadError = error => ({
  type: IMAGE_UPLOAD_ERROR,
  error
});

export const imageUploadCompleted = percent => ({
  type: IMAGE_UPLOAD_COMPLETED,
  percent
});

export const setImage = (id, url) => {
  return {
    type: SET_IMAGE,
    id,
    url
  }
}

export const setAllImages = (images) => {
  return {
    type: SET_ALL_IMAGE,
    images: images
  }
}

export const resetImages = () => {
  return {
    type: RESET_IMAGES
  }
}

export const removeImage = (id) => ({
  type: REMOVE_IMAGE,
  id
});

export const deleteImage = (idVehicle, idImage) => async dispatch => {
  const ref = storage().ref('/registra_auto');
  let path = `${RNFS.ExternalStorageDirectoryPath}/Regista Auto/${idVehicle}/${idImage}.${EXTENTION}`;

  if (await RNFS.exists(path)) {
    await RNFS.unlink(path)
  }
  await ref.child(`/${idVehicle}/${idImage}.${EXTENTION}`).delete();
  dispatch(removeImage(idImage));
}

export const selectPhotoTapped = (idVehicle) => dispatch => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: translate('SELECT_PHOTO'),
    cancelButtonTitle: translate('CANCEL'),
    takePhotoButtonTitle: translate('CAMERA'),
    chooseFromLibraryButtonTitle: translate('GALERY'),
    mediaType: 'photo',
    quality: 1.0,
    maxWidth: 5000,
    maxHeight: 5000,
    storageOptions: {
      skipBackup: true,
    },
  };

  ImagePicker.showImagePicker(options, async (result) => {
    if (!result.didCancel) {
      let { id, url } = await this.takeSnapshot(result, idVehicle)
      dispatch(setImage(id, url));
    }
  });
}

takeSnapshot = async ({ type, fileName, data: base64 }, idVehicle) => {
  const currentStatus = await Permissions.check('storage');

  if (currentStatus !== 'authorized') {
    const status = await Permissions.request('storage');

    if (status !== 'authorized') {
      return false;
    }
  }
  let id = Date.now();
  let path = `${RNFS.ExternalStorageDirectoryPath}/Regista Auto/${time.dateHourPhotoToString(idVehicle)}`;
  let pathFile = `${path}/${time.dateHourPhotoToString()}.${EXTENTION}`;
  if (!(await RNFS.exists(path))) {
    await RNFS.mkdir(path)
  }
  try {
    await RNFS.writeFile(pathFile, base64, 'base64');
    return { id, url: (constants.IS_ANDROID ? 'file://' : '') + pathFile }
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadImages = (idVehile, images) => async dispatch => {
  const ref = storage().ref('registra_auto');
  let allImages = [];

  putStorageItem = async ({ id, url }) => {
    try {
      if (url.startsWith('file:')) {
        const snapshot = await ref.child(`/${idVehile}/${id}.${EXTENTION}`).putFile(url)
        allImages.push({ id, url: snapshot.downloadURL });
      } else {
        allImages.push({ id, url });
      }
    } catch (error) {
      console.log('One failed:', error.message)
    }
  }

  await Promise.all(
    images.map(async (item) => {
      await putStorageItem(item);
    })
  )
  dispatch(imageUploadSucess(allImages));
  return allImages;
}

