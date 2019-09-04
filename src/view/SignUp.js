import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import InputText from '../components/InputText';
import Button from '../components/MyButton';
import colors from '../config/colors';
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
      phone: '',
      errorMessageUsername: '',
      errorMessagePassword: '',
      errorMessageConfirmPassword: '',
      errorMessageEmail: '',
      errorMessagePhone: '',
      loading: false
    }
  }

  handleLoginPress = () => {
    let { username, password, confirmPassword, email, phone } = this.state;
    console.log(this.state)
    this.setState({
      errorMessageUsername: !username ? 'Campo username é obrigatório' : '',
      errorMessagePassword: !password ? 'Campo password é obrigatório' : '',
      errorMessageConfirmPassword: !confirmPassword ? 'Campo confirm password é obrigatório' : '',
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
      errorMessagePhone: !phone ? 'Campo phone é obrigatório' : ''
    })
    if(password && confirmPassword && password !== confirmPassword){
      this.setState({
        errorMessageConfirmPassword: 'Confirm password não confere com password',
      })
    }

    if (!username || !password) {

    } else {

    }
  }

  handleSignUpPress = () => {

  }

  handleChange = (field, value: string) => {
    this.setState({ [field]: value })
  }

  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'>
        <View style={styles.form}>
          <InputText
            placeholder={strings.USERNAME_PLACEHOLDER}
            textContentType='username'
            errorMessage={this.state.errorMessageUsername}
            icon={{ name: 'user', size: 24, color: 'gray' }}
            onChangeText={(value) => this.handleChange('username', value.trim())}
            value={this.state.username} />

          <InputText
            placeholder={strings.PASSWORD_PLACEHOLDER}
            textContentType='password'
            secureTextEntry={true}
            errorMessage={this.state.errorMessagePassword}
            icon={{ name: 'lock', size: 24, color: 'gray' }}
            onChangeText={(value) => this.handleChange('password', value.trim())}
            value={this.state.password} />

          <InputText
            placeholder={strings.CONFIRMPASSWORD_PLACEHOLDER}
            textContentType='password'
            secureTextEntry={true}
            errorMessage={this.state.errorMessageConfirmPassword}
            icon={{ name: 'lock', size: 24, color: 'gray' }}
            onChangeText={(value) => this.handleChange('confirmPassword', value.trim())}
            value={this.state.confirmPassword} />

          <InputText
            placeholder={strings.EMAIL_PLACEHOLDER}
            textContentType='emailAddress'
            errorMessage={this.state.errorMessageEmail}
            icon={{ name: 'envelope', size: 24, color: 'gray' }}
            onChangeText={(value) => this.handleChange('email', value.trim())}
            value={this.state.email} />

          <InputText
            placeholder={strings.PHONE_PLACEHOLDER}
            textContentType='telephoneNumber'
            errorMessage={this.state.errorMessagePhone}
            icon={{ name: 'phone', size: 24, color: 'gray' }}
            onChangeText={(value) => this.handleChange('phone', value.trim())}
            value={this.state.phone} />

          <Button
            title={strings.SIGNUP}
            onPress={this.handleLoginPress}
            loading={loading}
          />
        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  form: {
    flex: 1,
    width: '80%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
