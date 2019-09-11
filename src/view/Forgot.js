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
import { styles } from '../config/styles';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';

import { Divider } from 'react-native-elements';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      errorMessageEmail: '',
      loading: false,
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
    let { email } = this.state;
    const { navigate } = this.props.navigation;
    this.setState({
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
    })
    if (!email) {

    } else {
      this.setState({ loading: true })
      navigate("LogIn")
      firebase.auth()
        .sendPasswordResetEmail(email)
        .then(user => {
          console.log(user);
          navigate("LogIn")
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

          </View>

          <Button
            title={strings.SEND}
            onPress={this.handleLoginPress}
            loading={loading}
            containerStyle={styles.buttonLogin} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}
