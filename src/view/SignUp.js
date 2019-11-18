import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { connect } from 'react-redux';
import { processSignup } from '../actions';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';

import colors from '../config/colors';
import metrics from '../config/metrics';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';


class SignUp extends Component {

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
        this.setState(prevState => ({ errorMessageEmail: strings.WEAK_PASSWORD, isLoading: !prevState.isLoading }));
        break;
      default:
        // return "Erro desconhecido.";
        console.log(code, message)
        Alert.alert(code, message)
        this.setState(prevState => ({ isLoading: !prevState.isLoading }));
        break;
    }
  }

  handleSignUpPress = () => {
    let { username, email, password, confirmPassword } = this.state;
    this.setState(prevState => ({
      errorMessageUsername: !username ? strings.USERNAME_MESSAGE : '',
      errorMessageEmail: !email ? strings.EMAIL_MESSAGE : '',
      errorMessagePassword: !password ? strings.PASSWORD_MESSAGE : '',
      errorMessageConfirmPassword: !confirmPassword ? strings.CONFIRMPASSWORD_MESSAGE : '',
      isLoading: !prevState.isLoading 
    }))
    if (password !== confirmPassword) {
      this.setState(prevState => ({
        errorMessagePassword: strings.PASSWORD_NOT_MATCH_MESSAGE,
        isLoading: !prevState.isLoading
      }))
    } else
      if (email.length > 0 && password.length > 0) {
        // this.setState({ isLoading: true })
        // firebase.auth()
        //   .createUserWithEmailAndPassword(email, password)
        //   .then(user => {
        //     console.log(user)
        //     this.setState({ password: '', isLoading: false })
        //   })
        //   .catch(error => {
        //     console.log(error.code)
        //     this.errorSignUp(error)
        //     this.setState({ password: '', isLoading: false })
        //   })
        
        this.props.processSignup({ email, password })
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
    let { isLoading } = this.state;
    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'>

        <View style={[styles.formSignUp, styles.form]}>
          <Image
            source={logo}
            style={styles.logo}
            width={75}
            height={75} />
          <View style={styles.inputContainer}>
            <MyInput
              label={strings.USERNAME_LABEL}
              placeholder={strings.USERNAME_PLACEHOLDER}
              textContentType='username'
              errorMessage={this.state.errorMessageUsername}
              leftIcon={<Icon style={styles.containerIcon} name='user' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('username', value.trim())}
              value={this.state.username} />
            <MyInput
              label={strings.EMAIL_LABEL}
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              autoCapitalize='none'
              errorMessage={this.state.errorMessageEmail}
              leftIcon={<Icon style={styles.containerIcon} name='envelope' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('email', value.trim())}
              value={this.state.email} />

            <MyInput
              label={strings.PASSWORD_LABEL}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              textContentType='password'
              autoCapitalize='none'
              secureTextEntry={this.state.isPassword}
              errorMessage={this.state.errorMessagePassword}
              leftIcon={<Icon style={styles.containerIcon} name='lock' size={24} color='gray' />}
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
              leftIcon={<Icon style={styles.containerIcon} name='lock' size={24} color='gray' />}
              onChangeText={(value) => this.handleChange('confirmPassword', value.trim())}
              value={this.state.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={this.handleIconChange}>
                  <Icon name={this.state.rightIcon} size={24} color='gray'></Icon>
                </TouchableOpacity>
              } />

          </View>
        </View>

        <View style={styles.buttonContainer}>
          <MyButton
            title={strings.SIGNUP1}
            onPress={this.handleSignUpPress}
            loading={isLoading} />
        </View>

        <View style={[styles.signupContainer, styles.containerNavigate]}>
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

  formSignUp: {
    height: metrics.DEVICE_HEIGHT * 0.75,
  },

  logo: {
    height: metrics.DEVICE_HEIGHT * 0.2,
    marginBottom: 5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  containerIcon:{
    marginLeft: 0,
    paddingHorizontal: 0
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


export default connect(null, { processSignup })(SignUp);
