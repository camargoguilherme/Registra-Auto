import { StyleSheet } from 'react-native';

import colors from '../config/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
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

  inputContainer: {
    width: '100%',
    marginVertical: 5,
  },

  text: {
    fontSize: 15,
    color: colors.WHITE,
  },

  text_underline: {
    fontSize: 15,
    color: colors.WHITE,
    textDecorationLine: "underline"
  },

  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10
  },

  forget: {
    alignItems: 'flex-end',
    margin: 10
  },

  // Style Tela Home
  containerFlatList: {
    flex: 1
  },

  itemList: {
    height: '30%',
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32,
  },

});