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

export default class Forgot extends Component {

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

  handleLoginPress = () => {
    let { email, password } = this.state;
    this.setState({
      errorMessageEmail: !email ? 'Campo email é obrigatório' : '',
      errorMessagePassword: !password ? 'Campo password é obrigatório' : ''
    })
    if (!email || !password) {

    }else{
      
    }
  }

  handleSignUpPress = () => {

  }

  handleEmailChange = (email: string) => {
    this.setState({ email })
  }

  handlePasswordChange = (password: string) => {
    this.setState({ password })
  }



  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='height'>
        <Image 
          source={logo} 
          style={styles.logo}
          width={175}
          height={175}/>
        <View style={styles.form}>
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

          <Button
            title={strings.LOGIN}
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
  logo: {
    flex: 0.5,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
});
