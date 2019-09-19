import firebase from 'react-native-firebase';

export const SET_SERIES = 'SET_SERIES';
const setSeries = series => ({
  type: SET_SERIES,
  series: series
})

export const watchSeries = () => {
  const {currentUser} = firebase.auth();

  return dispatch => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/series`)
      .on('value', snapshot => {
        const series = snapshot.val();
        const action = setSeries(series);
        dispatch(action);
      })
  }
}