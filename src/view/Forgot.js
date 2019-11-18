import React, { Component } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'react-native-firebase';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import strings from '../config/strings';
import colors from '../config/colors';
import metrics from '../config/metrics';
import logo from '../assets/images/logo.png';


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errorMessageEmail: '',
      loading: false,
    }
    this.navigate = this.props.navigation.navigate;
  }

  errorLogin({ code, message }) {
    switch (code) {
      case 'auth/wrong-password':
        this.setState({ errorMessagePassword: message })
        break;
      case '':

        break;
      case '':

        break;
      case '':

        break;
      case '':

        break;
      case '':

        break;
      case '':

        break;


    }
  }

  handleLoginPress = () => {
    let { email } = this.state;

    this.setState({
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
    })
    if (!email) {

    } else {
      this.setState({ loading: true })
      this.navigate("LogIn")
      firebase.auth()
        .sendPasswordResetEmail(email)
        .then(user => {
          console.log(user);
          this.navigate("LogIn")
        })
        .catch(error => {
          console.log(error.code)
          this.errorLogin(error)
          this.setState({ email: '', loading: false })
        })
    }

  }

  handleEmailChange = (email: string) => {
    this.setState({ email: email.trim() })
  }

  handlePasswordChange = (password: string) => {
    this.setState({ password: password.trim() })
  }

  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'>

        <View style={[styles.formForgot, styles.form]}>
          <Image
            source={logo}
            style={styles.logo}
            width={120}
            height={120} />
          <View style={styles.inputContainer}>
            <MyInput
              label={strings.EMAIL_LABEL}
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              autoCapitalize='none'
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon name='envelope' size={24} color='gray' />}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />

          </View>
        </View>
        <View style={styles.buttonContainer}>
          <MyButton
            title={strings.SEND}
            onPress={this.handleLoginPress}
            loading={loading} />
        </View>
        <View style={[styles.signupContainer, styles.containerNavigate]}>
          <TouchableOpacity
            onPress={() => { this.navigate("LogIn") }}>
            <Text style={styles.textUnderline}>{strings.LOGIN}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
  },

  form: {
    margin: 20,
    padding: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },

  formForgot: {
    height: metrics.DEVICE_HEIGHT * 0.45,
  },

  logo: {
    height: metrics.DEVICE_HEIGHT * 0.2,
    marginBottom: 5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
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

  containerNavigate: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginBottom: 20,
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

});
