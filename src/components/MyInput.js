import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { Input, InputProps } from 'react-native-elements';
import { styles } from '../config/styles'

type props = InputProps;

export default class MyInput extends Component<props>{

  onChangeText = (text) => {
    this.props.onChangeText(text)
    this.setState({ value: text })
  }

  render() {
    let { containerStyle, inputContainerStyle, leftIconContainerStyle, labelStyle, errorStyle, ...otherProps } = this.props;
    return (
      <Input
        containerStyle={[styles.containerStyleMyInput, containerStyle]}
        placeholderTextColor='gray'
        inputContainerStyle={[styles.inputContainerStyleMyInput, inputContainerStyle]}
        leftIconContainerStyle={[styles.leftIconContainerStyleMyInput, leftIconContainerStyle]}
        labelStyle={[styles.labelStyleMyInput, labelStyle]}
        errorStyle={[styles.error, errorStyle]}
        labelStyle={[styles.labelStyleMyInput, labelStyle]}
        {...otherProps}
      />
    )
  }
}
