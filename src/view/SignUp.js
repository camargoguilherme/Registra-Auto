import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import InputText from '../components/InputText';
import Button from '../components/MyButton';
import colors from '../config/colors';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';

import { Divider } from 'react-native-elements';

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
      errorMessageUsername: !username ? 'Campo username é obrigatório' : '',
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
      errorMessagePassword: !password ? 'Campo password é obrigatório' : '',
      errorMessageConfirmPassword: !confirmPassword ? 'Campo confirm password é obrigatório' : ''
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
    const { navigate } = this.props.navigation
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
              placeholder={strings.USERNAME_PLACEHOLDER}
              textContentType='username'
              errorMessage={this.state.errorMessageUsername}
              icon={{ name: 'user', size: 24, color: 'gray' }}
              onChangeText={(value) => this.handleChange('username', value.trim())}
              value={this.state.username} />
            <InputText
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              icon={{ name: 'envelope', size: 24, color: 'gray' }}
              onChangeText={(value) => this.handleChange('email', value.trim())}
              value={this.state.email} />

            <InputText
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              icon={{ name: 'lock', size: 24, color: 'gray' }}
              onChangeText={(value) => this.handleChange('password', value.trim())}
              value={this.state.password}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />
            <InputText
              placeholder={strings.CONFIRMPASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessageConfirmPassword}
              icon={{ name: 'lock', size: 24, color: 'gray' }}
              onChangeText={(value) => this.handleChange('confirmPassword', value.trim())}
              value={this.state.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />

          </View>

          <Button
            title={strings.SIGNUP}
            onPress={this.handleSignUpPress}
            loading={loading}
            containerStyle={styles.buttonSignUp} />
        </View>
        <View style={styles.signupContainer}>
          <Text style={[styles.text, { marginHorizontal: 10 }]}>Already have an account,</Text>
          <TouchableOpacity
            onPress={() => { navigate("LogIn") }}>
            <Text style={styles.text_underline}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
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

  divider: {
    marginVertical: 15
  }
});
