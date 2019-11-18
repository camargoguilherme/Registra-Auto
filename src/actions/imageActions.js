import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import { storage } from 'react-native-firebase';

import { translate } from '../locales';
import time from '../util/time';


import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_COMPLETED,
  SET_IMAGE,
  DELETE_IMAGE
} from '../actions/types';

export const imageUploadSucess = (id, url) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  id,
  url
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

export const deleteImage = (id) => ({
  type: DELETE_IMAGE,
  id
});

export const processUpload = () => {

  // const { currentUser } = firebase.auth();
  // return dispatch => {
  //   firebase
  //     .database()
  //     .ref(`users/${currentUser.uid}/vehicles`)
  //     .on('value', snapshot => {
  //       const vehicles = snapshot.val();
  //       const action = setVehicles(vehicles);
  //       dispatch(action);
  //       return vehicles;
  //     })
  // }
}

export const selectPhotoTapped = () => dispatch => {
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

  ImagePicker.showImagePicker(options, (result) => {
    if (!result.didCancel) {
      console.log('before:takeSnapshot')
      let image = this.takeSnapshot(result)
      dispatch(setImage(image));
    }
  });
}

takeSnapshot = async ({ type, fileName, data: base64 }) => {
  const currentStatus = await Permissions.check('storage');

  if (currentStatus !== 'authorized') {
    const status = await Permissions.request('storage');

    if (status !== 'authorized') {
      return false;
    }
  }
  let id = Date.now();
  let path = `${RNFS.ExternalStorageDirectoryPath}/Regista Auto`;
  let pathFile = `${path}/${time.dateHourPhotoToString()}.jpeg`;
  if (!(await RNFS.exists(path))) {
    await RNFS.mkdir(path)
  }

  try {
    await RNFS.writeFile(pathFile, base64, 'base64');
    return { id, url: pathFile }
  } catch (error) {
    console.log(error.message);
  }
};

uploadImages = (...images) => dispatch => {
  let allImages = Promise.all(
    images.map(({ id, data }) => {
      let snapshot = storage().ref('registra_auto/' + id + '/').putFile(file, { contentType: data.type })
      let url = snapshot.ref.getDownloadURL();
      return { id, url }
    })
  )
  return allImages;
}
