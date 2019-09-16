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
    marginBottom: 10,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  form: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },

  formLogin: {
    height: metrics.DEVICE_HEIGHT * 0.5,
  },

  formSignUp: {
    height: metrics.DEVICE_HEIGHT * 0.75,
  },

  formForgot: {
    height: metrics.DEVICE_HEIGHT * 0.4,
  },

  inputContainer: {
    flex: 1,
    height: metrics.DEVICE_HEIGHT * 0.2,
    marginVertical: 5,
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

  buttonLinkContainer: {
    flexDirection: 'column',
    marginTop: -45,
    width: metrics.DEVICE_WIDTH * 0.75,
    height: 95,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10
  },

  link: {
    alignItems: 'flex-end',
    margin: 10
  },

  title: {
    fontSize: 32,
  },

  // Styles MyButton

  buttonStyleMyButton: {
    flex: 1,
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
  },

  containerStyleMyButton: {
    flex: 1,
    flexDirection: 'row',
  },

  // Styles MyInput
  containerStyleMyInput: {
    flex: 1,
    height: 75,
    paddingHorizontal: 0,
  },

  inputContainerStyle: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth * 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },

  leftIconContainerStyle: {
    marginRight: 10,
    alignContent: "space-around"
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
    borderRadius: 10,
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
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },

  containerStatus: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },

  itemTitulo: {
  },

  // Styles MySearchBar
  containerStyleMySearchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },

  // Style GroupButtons
  buttonStyleGroupButtons: {
    backgroundColor: colors.DEFAULT,
  },

  selectedButtonStyleGroupButtons: {
    backgroundColor: colors.BACKGROUND
  },

  selectedTextStyleGroupButtons: {
    fontWeight: 'bold', fontSize: 20
  },

  containerStyleGroupButtons: {
    height: 45
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

  }

});