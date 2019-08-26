import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';

export default class InputText extends Component{
  
    /**
     *
     * Possible values for `textContentType` are:
     *
     *  - `'none'`, `'URL'`, `'addressCity'` , `'addressCityAndState'`, `'addressState'`, `'countryName'`, 
     *    `'creditCardNumber'`, `'emailAddress'`, `'familyName'`, `'fullStreetAddress'`, `'givenName'`, `'jobTitle'`, 
     *    `'location'`, `'middleName'`, `'name'`, `'namePrefix'`, `'nameSuffix'`, `'nickname'`, `'organizationName'`, 
     *    `'postalCode'`, `'streetAddressLine1'`, `'streetAddressLine2'`, `'sublocality'`, `'telephoneNumber'`, `'username'`, 
     *    `'password'`, `'newPassword'`, `'oneTimeCode'`
     *
     */
  

  constructor(props) {
    super(props)
    this.state = {
      ...props
    }

  }

  onChangeText = (text) => {
    this.props.onChangeText(text)
    this.setState({value: text})
  }

  render() {
    let { placeholder, value, icon, textContentType, autoCapitalize, inputContainerStyle } = this.state
    return (
      <Input
        placeholder={placeholder}
        autoCapitalize={'words'}
        textContentType={textContentType}
        errorMessage={`Campo ${placeholder} obrigatório`}
        containerStyle={styles.containerStyle}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        errorStyle={styles.error}
        value={value}
        onChangeText={this.onChangeText}
        leftIcon={
          <Icon
            name={icon}
            size={24}
            color='gray'
          />
        }
      />
    )
  }

}

// let width = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.8
// let height = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.1

const styles = StyleSheet.create({

  containerStyle:{
    margin: 0,
    padding: 0
  },  

  inputContainerStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: 'transparent'
  },
  leftIconContainerStyle: {
    alignContent: "space-around"
  },

  error: {
    color: 'red',
    textAlign: 'left'
  },

});