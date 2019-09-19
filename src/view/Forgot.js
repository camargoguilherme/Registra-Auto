import React, { Component } from 'react';
import {
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import firebase from 'react-native-firebase';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import { styles } from '../config/styles';
import strings from '../config/strings';
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
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon name='envelope' size={24} color='gray' />}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />

          </View>
        </View>
        <View style={styles.buttonLinkContainer}>
          <MyButton
            title={strings.SEND}
            onPress={this.handleLoginPress}
            loading={loading} />
        </View>
        <View style={styles.signupContainer}>
          <TouchableOpacity
            onPress={() => { this.navigate("LogIn") }}>
            <Text style={styles.textUnderline}>{strings.LOGIN}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
