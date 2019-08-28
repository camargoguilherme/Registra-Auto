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
import logo from '../assets/images/logo.png'
export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      errorMessageUsername: '',
      errorMessagePassword: ''
    }
  }

  handleLoginPress = () => {
    let { username, password } = this.state;
    this.setState({
      errorMessageUsername: !username ? 'Campo username é obrigatório' : '',
      errorMessagePassword: !password ? 'Campo password é obrigatório' : ''
    })
    if (!username || !password) {

    }else{
      
    }
  }

  handleSignUpPress = () => {

  }

  handleUsernameChange = (username: string) => {
    this.setState({ username })
  }

  handlePasswordChange = (password: string) => {
    this.setState({ password })
  }



  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <View
        style={styles.container}
        behavior='padding'>
        <Image 
          source={logo} 
          style={styles.logo}
          width={175}
          height={175}/>
        <View style={styles.form}>
          <InputText
            placeholder={strings.EMAIL_PLACEHOLDER}
            textContentType='username'
            errorMessage={this.state.errorMessageUsername}
            icon={{ name: 'user', size: 24, color: 'gray' }}
            onChangeText={this.handleUsernameChange}
            value={this.state.username} />

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

      </View>
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
