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
        style
        leftIconContainerStyle={styles.leftIconContainerStyle}
        errorStyle={styles.error}
        {...otherProps}
        leftIcon={
          <Icon
            {...icon}
          />
        }
      />
    )
  }

}

// let width = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.8
// let height = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.1

const styles = StyleSheet.create({
  inputContainerStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth*5,
  },
  leftIconContainerStyle: {
    alignContent: "space-around"
  },

  error: {
    color: 'red',
    textAlign: 'left'
  },

});