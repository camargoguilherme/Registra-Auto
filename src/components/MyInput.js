import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { Input, InputProps } from 'react-native-elements';
import { styles } from '../config/styles'
import time from '../util/time';

type props = InputProps;

export default class MyInput extends Component<props>{
  constructor(props) {
    super(props);
  }

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
        on
        {...otherProps}
      />
    )
  }
}
