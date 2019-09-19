import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import { processLogin } from '../actions';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';

import { styles } from '../config/styles';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorMessageEmail: '',
      errorMessagePassword: '',
      isLoading: false,
      rightIcon: 'eye-slash',
      isPassword: true
    }
    this.navigate = this.props.navigation.navigate;
  }

  getMessageByError({ code, message }) {
    switch (code) {
      case "auth/user-not-found":
        this.setState(prevState => ({ errorMessageEmail: strings.USER_NOT_FOUND, isLoading: !prevState.isLoading }));
        break;
      case "auth/wrong-password":
        this.setState(prevState => ({ errorMessagePassword: strings.WRONG_PASSWORD, isLoading: !prevState.isLoading }));
        break;
      case "auth/invalid-email":
        this.setState(prevState => ({ errorMessageEmail: strings.INVALID_EMAIL, isLoading: !prevState.isLoading }));
        break;
      case "auth/weak-password":
        this.setState(prevState => ({ errorMessageEmail: strings.INVALID_EMAIL, isLoading: !prevState.isLoading }));
        break;
      default:
        // return "Erro desconhecido.";
        console.log(code, message)
        Alert.alert(code, message)
        this.setState(prevState => ({ isLoading: !prevState.isLoading }));
        break;
    }
  }


  handleLoginPress = () => {
    let { email, password } = this.state;
    this.setState({
      errorMessageEmail: !email ? strings.EMAIL_MESSAGE : '',
      errorMessagePassword: !password ? strings.PASSWORD_MESSAGE : '',
    });

    if (email.length > 0 && password.length > 0) {
      this.setState(prevState => ({ isLoading: !prevState.isLoading }));

      this.props.processLogin({ email, password })
        .then(user => {
          if (user) {
            this.navigate('Home');
          } else {
            this.setState(prevState => ({ isLoading: !prevState.isLoading }));
          }
        })
        .catch(error => {
          this.getMessageByError(error)
        })
    }


  }

  onChangeHandler(field, valor) {
    this.setState({
      [field]: valor.trim()
    })
  }

  handleIconChange = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'eye' ? 'eye-slash' : 'eye',
      isPassword: !prevState.isPassword
    }))
  }

  render() {
    let { isLoading } = this.state;

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
              label={strings.EMAIL_LABEL}
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon style={styles.containerIcon} name='envelope' size={24} color='gray' />}
              onChangeText={(text) => this.onChangeHandler('email', text)}
              value={this.state.email} />

            <MyInput
              label={strings.PASSWORD_LABEL}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              leftIcon={<Icon style={styles.containerIcon} name='lock' size={24} color='gray' />}
              onChangeText={(text) => this.onChangeHandler('password', text)}
              value={this.state.password}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <MyButton
            title={strings.LOGIN}
            onPress={this.handleLoginPress}
            loading={isLoading}
          />
        </View>
        <View style={styles.signupContainer}>
          <View style={styles.containerNavigate}>
            <TouchableOpacity style={styles.link}
              onPress={() => { this.navigate("Forgot") }}>
              <Text style={styles.textUnderline}>{strings.FORGOT}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerNavigate}>
            <Text style={[styles.text, { marginHorizontal: 10 }]}>{strings.DONT_HAVE}</Text>
            <TouchableOpacity
              onPress={() => { this.navigate("SignUp") }}>
              <Text style={styles.textUnderline}>{strings.SIGNUP2}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(null, { processLogin })(Login);
