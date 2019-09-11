import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import InputText from '../components/InputText';
import Button from '../components/MyButton';
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
    let { email, password } = this.state;
    const { navigate } = this.props.navigation;
    // this.setState({
    //   errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
    //   errorMessagePassword: !password ? 'Campo password é obrigatório' : ''
    // })
    // if (!email || !password) {

    // } else {
    //   this.setState(prevState => ({loading: !prevState.loading }))
    //   firebase.auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then(user => {
    //       console.log(user)
    //       navigate('Home');
    //     })
    //     .catch(error => {
    //       console.log(error.code)
    //       this.errorLogin(error)
    //       this.setState(prevState => ({ password: '', loading: !prevState.loading }))
    //     })
    // }
    navigate('Home');

  }

  handleEmailChange = (email: string) => {
    this.setState({ email: email.trim() })
  }

  handlePasswordChange = (password: string) => {
    this.setState({ password: password.trim() })
  }

  handleIconChange = () => {
    this.setState( prevState =>({ 
      rightIcon: prevState.rightIcon === 'eye' ? 'eye-slash' : 'eye',
      isPassword: !prevState.isPassword 
    }))
  }

  render() {
    let { loading } = this.state;
    const { navigate } = this.props.navigation;
    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'>

        <View style={styles.form}>
          <Image
            source={logo}
            style={styles.logo}
            width={120}
            height={120} />
          <View style={styles.inputContainer}>
            <InputText
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              icon={{ name: 'envelope', size: 24, color: 'gray' }}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />

            <InputText
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              icon={{ name: 'lock', size: 24, color: 'gray' }}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />
          </View>

          <Button
            title={strings.LOGIN}
            onPress={this.handleLoginPress}
            loading={loading}
            containerStyle={styles.buttonLogin} />
          <TouchableOpacity style={styles.forget}
            onPress={() => { navigate("Forgot") }}>
            <Text style={styles.text_underline}>Forgot Password?</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.signupContainer}>
          <Text style={[styles.text, { marginHorizontal: 10 }]}>Don't have an account,</Text>
          <TouchableOpacity
            onPress={() => { navigate("SignUp") }}>
            <Text style={styles.text_underline}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

