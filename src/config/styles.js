import { StyleSheet } from 'react-native';

import colors from '../config/colors';
import metrics from '../config/metrics';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
  },

  logo: {
    height: metrics.DEVICE_HEIGHT * 0.2,
    marginBottom: 5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  form: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },

  formDetails: {
    height: metrics.DEVICE_HEIGHT * 0.70,
    flexDirection: 'row'
  },

  formLogin: {
    height: metrics.DEVICE_HEIGHT * 0.6,
  },

  formSignUp: {
    height: metrics.DEVICE_HEIGHT * 0.80,
  },

  formForgot: {
    height: metrics.DEVICE_HEIGHT * 0.45,
  },

  inputContainer: {
    flex: 1,
  },

  text: {
    fontSize: 15,
    color: colors.WHITE,
  },

  textUnderline: {
    fontSize: 15,
    color: colors.WHITE,
    textDecorationLine: "underline"
  },

  buttonContainer: {
    flexDirection: 'column',
    marginTop: -45,
    width: metrics.DEVICE_WIDTH * 0.75,
    alignSelf: 'center',
    alignItems: 'flex-end',
    marginVertical: 10
  },

  signupContainer: {
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    bottom: -45,
  },

  link: {
    alignItems: 'flex-end',
    margin: 10
  },

  title: {
    fontSize: 32,
  },

  containerNavigate: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  containerIcon:{
    marginLeft: 0,
    paddingHorizontal: 0
  },

  // Styles MyButton
  buttonStyleMyButton: {
    flex: 1,
    width: '100%',
    height: 50,
    alignItems: 'center',
  },

  containerStyleMyButton: {
    flex: 0.5,
    flexDirection: 'row',
  },

  // Styles MyInput
  containerStyleMyInput: {
    height: 75,
    marginVertical: 10,
    paddingHorizontal: 0,
  },

  inputContainerStyleMyInput: {
    width: '100%',
    height: metrics.INPUT_HEIGHT,
    paddingRight: 10,
    paddingVertical: 0,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth * 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  leftIconContainerStyleMyInput: {
    width: 50,
    height: '100%',
    margin: 0,
    marginLeft: 0,
    marginRight: 10,
    paddingHorizontal: 0,
    paddingLeft: 0,
    alignContent: "space-around",
    backgroundColor: colors.BACKGROUND
  },

  labelStyleMyInput: {
    fontSize: 18,
    color: colors.DEFAULT
  },

  error: {
    fontSize: 15,
    fontWeight: '400',
    color: 'red',
    textAlign: 'left'
  },

  // Style Tela Home

  containerFlatList: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.BACKGROUND,
  },

  // Styles MyFlatList
  item: {
    minHeight: 75,
    maxHeight: 120,
    height: 100,
    margin: 8,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row'
  },

  // Styles FlatListItem
  contentInfor: {
    flex: 2,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  itemInfo: {
    flex: 2,
    justifyContent: 'space-between',

  },

  buttonInfo: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textButton: {
    justifyContent: 'center',
    color: colors.PRIMARY
  },

  textPlaca: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerStatus: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },

  itemTitulo: {
    marginHorizontal: 5,
    fontSize: 16
  },

  // Styles MySearchBar
  containerStyleMySearchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },

  // Style GroupButtons

  containerStyleGroupButtons: {
    height: 30
  },

  buttonStyleGroupButtons: {
    backgroundColor: colors.BACKGROUND,
  },

  selectedButtonStyleGroupButtons: {
    backgroundColor: colors.WHITE
  },

  selectedTextStyleGroupButtons: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.BACKGROUND,
  },

  textStyleGroupButtons: {
    fontWeight: '400',
    color: colors.WHITE,
  },

  // Styles Overlay
  containerOverLay: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  containerHeadOverLay: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  containerBodyOverLay: {
    flex: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.DEFAULT,
    justifyContent: 'space-between'
  },

  containerFooterOverLay: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around'
  },

  buttonOverlay: {
    flex: 1,
    marginHorizontal: 5
  },

  textHeaderOverlay: {
    fontWeight: 'bold',
    fontSize: 18,

  },

  // Styles MyPicker
  containerMyPicker: {
    marginVertical: 5,
    marginHorizontal: 2,
    paddingHorizontal: 0,
  },

  labelStyleMyPicker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.DEFAULT,
  },

  containerStyleMyPicker: {
    height: 45,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth * 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },

  //Styles ImagesSlider

  containerImagesSlider: {
    height: 120,
    borderWidth: 3,
    borderColor: colors.SILVER,
    backgroundColor: colors.DEFAULT,
    paddingVertical: 5
  },

  itemImagesSlider: {
    height: 100,
    width: 90,
    marginHorizontal: 10,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
  },

  containerItemImageSlider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  deleteItemImageSlider:{
    height: '50%',
    width: '50%',
    borderColor: colors.DANGER,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraImageSlider:{
    bottom: 0,
    left: '85%',
    width: 40,
    height: 40,
    borderColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  }

});