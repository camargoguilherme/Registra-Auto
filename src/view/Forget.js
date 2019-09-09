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

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      loading: false
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
    this.setState({
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
      errorMessagePassword: !password ? 'Campo password é obrigatório' : ''
    })
    if (!email || !password) {

    } else {
      this.setState({ loading: true })
      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user)
        })
        .catch(error => {
          console.log(error.code)
          this.errorLogin(error)
          this.setState({ password: '', loading: false })
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
              secureTextEntry={true}
              errorMessage={this.state.errorMessagePassword}
              icon={{ name: 'lock', size: 24, color: 'gray' }}
              onChangeText={this.handlePasswordChange}
              value={this.state.password} />
          </View>

          <Button
            title={strings.LOGIN}
            onPress={this.handleLoginPress}
            loading={loading}
            containerStyle={styles.buttonLogin} />
          <TouchableOpacity style={styles.forget}
            onPress={() => { navigate("Forget") }}>
            <Text style={styles.text_underline}>Forget Password?</Text>
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
