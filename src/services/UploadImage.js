import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
// import { storage } from 'react-native-firebase';
// import { getUser, setUser } from './ApiServices';


export const selectPhotoTapped = (cb) => {
  // More info on all the options is below in the API Reference... just some common use cases shown here
  const options = {
    title: 'Selecione uma foto',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Camera',
    chooseFromLibraryButtonTitle: 'Galeria',
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
       console.log('showImagePicker', result)
      cb(this.uploadImage(result))
    }
  });
}

uploadImage = async (data) => {
  //let result = await takeSnapshot(data.data)
  console.log('result', data)
  return { id: Date.now(), url: data.data}
}


uploadImage1 = async (data) => {
  // let user = await getUser();
  // let path = user._id;
  const file = await this.takeSnapshot(data.data);
  
  let snapshot = await storage().ref('registra_auto/'+ Date.now() + '/').putFile(file, { contentType: data.type })
  return await snapshot.ref.getDownloadURL()
}

// uploadImage2 = (imageUri) => {
//   const ext = imageUri.split('.').pop(); // Extract image extension
//   const filename = `${uuid()}.${ext}`; // Generate unique name
//   this.setState({ uploading: true });
//   firebase
//     .storage()
//     .ref(`tutorials/images/${filename}`)
//     .putFile(imageUri)
//     .on(
//       firebase.storage.TaskEvent.STATE_CHANGED,
//       snapshot => {
//         let state = {};
//         state = {
//           ...state,
//           progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
//         };
//         if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
//           const allImages = this.state.images;
//           allImages.push(snapshot.downloadURL);
//           state = {
//             ...state,
//             uploading: false,
//             imgSource: '',
//             imageUri: '',
//             progress: 0,
//             images: allImages
//           };
//           AsyncStorage.setItem('images', JSON.stringify(allImages));
//         }
//         this.setState(state);
//       },
//       error => {
//         unsubscribe();
//         alert('Sorry, Try again.');
//       }
//     );
// };


takeSnapshot = async (base64) => {
  const currentStatus = await Permissions.check('storage');

  if (currentStatus !== 'authorized') {
    const status = await Permissions.request('storage');

    if (status !== 'authorized') {
      return false;
    }
  }

  let path = RNFS.re `${RNFS.ExternalStorageDirectoryPath}/Regista Auto/${Date.now()}.jpeg`;
  try {
    const data = await RNFS.write(path, base64, 'base64');
    console.log('data', data);
    return data
  } catch (error) {
    console.log(error.message);
  }
};