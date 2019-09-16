import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import firebase from 'react-native-firebase';

import MyInput from '../components/MyInput';
import MyButton from '../components/MyButton';
import strings from '../config/strings';
import logo from '../assets/images/logo.png';

import { styles } from '../config/styles';
import colors from '../config/colors';


export default class Details extends Component {
  constructor(props) {
    super(props);
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
  render() {
    let { loading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.form}>

          <View style={styles.inputContainer}>
            <MyInput
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              icon={{ name: 'envelope', size: 24, color: 'gray' }}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />
            <MyInput
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              icon={{ name: 'envelope', size: 24, color: 'gray' }}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />
            <MyInput
              placeholder={strings.EMAIL_PLACEHOLDER}
              textContentType='emailAddress'
              errorMessage={this.state.errorMessageEmail}
              icon={{ name: 'envelope', size: 24, color: 'gray' }}
              onChangeText={this.handleEmailChange}
              value={this.state.email} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <MyButton
              title={strings.SAVE}
              onPress={this.handleLoginPress}
              loading={loading}
              containerStyle={styles.button} 
              buttonStyle={{ backgroundColor: colors.SUCCESS }}/>
            <MyButton
              title={strings.CANCEL}
              onPress={this.handleLoginPress}
              loading={loading}
              containerStyle={styles.button} 
              buttonStyle={{ backgroundColor: colors.WARNING }}/>
          </View>
      </View>
    );
  }
}
