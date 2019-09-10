import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input, InputProps } from 'react-native-elements';

type Props = InputProps;

export default class InputText extends Component<Props>{
  
  onChangeText = (text) => {
    this.props.onChangeText(text)
    this.setState({value: text})
  }

  render() {
    let {  inputContainerStyle, containerStyle, icon, ...otherProps } = this.props
    return (
      <Input
        containerStyle={[styles.containerStyle, containerStyle]}
        inputContainerStyle={[styles.inputContainerStyle, inputContainerStyle]}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        errorStyle={styles.error}
        leftIcon={
          <Icon
          {...icon}
          />
        }
        {...otherProps}
      />
    )
  }

}

// let width = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.8
// let height = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.1

const styles = StyleSheet.create({
  containerStyle:{
    width: '100%',
    height: 75,
    paddingHorizontal: 0,
  },

  inputContainerStyle: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth*5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  leftIconContainerStyle: {
    marginRight: 10,
    alignContent: "space-around"
  },

  error: {
    fontSize: 15,
    fontWeight: '400',
    color: 'red',
    textAlign: 'left'
  },

});