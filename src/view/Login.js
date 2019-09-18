import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';

import { styles } from '../config/styles';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      loading: false,
      rightIcon: 'eye-slash',
      isPassword: true
    }
    this.navigate = this.props.navigation.navigate;
  }

  errorLogin({ code, message }) {
    switch (code) {
      case 'auth/wrong-password':
        this.setState(prevState => ({ errorMessagePassword: message,  loading: !prevState.loading}) );
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
    let { email, password } = this.state;
    this.setState(prevState => ({
      errorMessageEmail: !email ? strings.EMAIL_MESSAGE : '',
      errorMessagePassword: !password ? strings.PASSWORD_MESSAGE : '',
      loading: !prevState.loading
    }));
    if (!email || !password) {

    } else {
      this.setState(prevState => ({loading: !prevState.loading }))
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user)
          this.navigate('Home');
        })
        .catch(error => {
          console.log(error.code)
          this.errorLogin(error)
          this.setState(prevState => ({ password: '', loading: !prevState.loading }))
        })
    }

  }

  handleEmailChange = (email: string) => {
    this.setState({ email: email.trim() })
  }

  handlePasswordChange = (password: string) => {
    this.setState({ password: password.trim() })
  }

  handleIconChange = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'eye' ? 'eye-slash' : 'eye',
      isPassword: !prevState.isPassword
    }))
  }

  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}>
        <View style={[styles.formLogin, styles.form]}>
          <Image
            source={logo}
            style={styles.logo}
            width={120}
            height={120} />
          <View style={styles.inputContainer}>
            <MyInput
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon name='envelope' size={24} color='gray' />}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />

            <MyInput
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              leftIcon={<Icon name='lock' size={24} color='gray' />}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>}
            />
          </View>
        </View>
        <View style={styles.buttonLinkContainer}>
          <MyButton
            title={strings.LOGIN}
            onPress={this.handleLoginPress}
            loading={loading}
          />

          <TouchableOpacity style={styles.link}
            onPress={() => { this.navigate("Forgot") }}>
            <Text style={styles.textUnderline}>{strings.FORGOT}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <Text style={[styles.text, { marginHorizontal: 10 }]}>{strings.DONT_HAVE}</Text>
          <TouchableOpacity
            onPress={() => { this.navigate("SignUp") }}>
            <Text style={styles.textUnderline}>{strings.SIGNUP2}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

