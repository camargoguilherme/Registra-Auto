import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';

import { styles } from '../config/styles';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';


export default class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      errorMessageUsername: '',
      errorMessagePassword: '',
      errorMessageConfirmPassword: '',
      errorMessageEmail: '',
      loading: false,
      rightIcon: 'eye-slash',
      isPassword: true
    }
    this.navigate = this.props.navigation.navigate;
  }

  errorSignUp({ code, message }) {
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

  handleSignUpPress = () => {
    let { username, email, password, confirmPassword } = this.state;
    this.setState({
      errorMessageUsername: !username ? strings.USERNAME_MESSAGE : '',
      errorMessageEmail: !email ? strings.EMAIL_MESSAGE : '',
      errorMessagePassword: !password ? strings.PASSWORD_MESSAGE : '',
      errorMessageConfirmPassword: !confirmPassword ? strings.CONFIRMPASSWORD_MESSAGE : ''
    })
    if (!email || !password) {

    } else {
      this.setState({ loading: true })
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user)
          this.setState({ password: '', loading: false })
        })
        .catch(error => {
          console.log(error.code)
          this.errorSignUp(error)
          this.setState({ password: '', loading: false })
        })
    }

  }

  handleChange = (field: string, value: string) => {
    this.setState({ [field]: value.trim() })
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
        style={styles.container}
        behavior='height'>

        <View style={[styles.form, styles.formSignUp]}>
          <Image
            source={logo}
            style={styles.logo}
            width={120}
            height={120} />
          <View style={styles.inputContainer}>
            <MyInput
              label={strings.USERNAME_LABEL}
              placeholder={strings.USERNAME_PLACEHOLDER}
              textContentType='username'
              errorMessage={this.state.errorMessageUsername}
              leftIcon={<Icon name='user' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('username', value.trim())}
              value={this.state.username} />
            <MyInput
              label={strings.EMAIL_LABEL}
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon name='envelope' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('email', value.trim())}
              value={this.state.email} />

            <MyInput
              label={strings.PASSWORD_LABEL}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              leftIcon={<Icon name='lock' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('password', value.trim())}
              value={this.state.password}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />
            <MyInput
              label={strings.CONFIRMPASSWORD_LABEL}
              placeholder={strings.CONFIRMPASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessageConfirmPassword}
              leftIcon={<Icon name='lock' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('confirmPassword', value.trim())}
              value={this.state.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />

          </View>
        </View>

        <View style={styles.buttonLinkContainer}>
          <MyButton
            title={strings.SIGNUP1}
            onPress={this.handleSignUpPress}
            loading={loading} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={[styles.text, { marginHorizontal: 10 }]}>{strings.HAVE}</Text>
          <TouchableOpacity
            onPress={() => { this.navigate("LogIn") }}>
            <Text style={styles.textUnderline}>{strings.LOGIN}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
