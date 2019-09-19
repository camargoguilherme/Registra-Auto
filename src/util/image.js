import ImagePicker from 'react-native-image-picker';
import Permissions from 'react-native-permissions';
import RNFS from 'react-native-fs';
// import { storage } from 'react-native-firebase';
// import { getUser, setUser } from './ApiServices';


selectPhotoTapped = async (cb) => {
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
       // console.log('showImagePicker', result)
      this.uploadImage(result).then( image => cb(image))
    }
  });
}

uploadImage = async (data) => {
  let url = await this.takeSnapshot(data.data)
  //console.log('result', result)
  return { id: Date.now(), url: url}
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
  const path = `${RNFS.ExternalStorageDirectoryPath}/Regista Auto`;
  const currentStatus = await Permissions.check('storage');

  if (currentStatus !== 'authorized') {
    const status = await Permissions.request('storage');

    if (status !== 'authorized') {
      return false;
    }
  }

  if(!(await RNFS.exists(path))){
    console.log('takeSnapshot:mkdir', path);
    RNFS.mkdir(path);
  }

  let pathFile = `${path}/${Date.now()}.jpeg`;
  try {
    await RNFS.writeFile(pathFile, base64, 'base64');
    return pathFile
  } catch (error) {
    console.log(error.message);
  }
};

const image = {
  selectPhotoTapped: selectPhotoTapped,
  uploadImage: uploadImage,
  takeSnapshot: takeSnapshot
}

export default image;