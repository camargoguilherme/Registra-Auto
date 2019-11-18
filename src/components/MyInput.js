import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { Input, InputProps } from 'react-native-elements';
import colors from '../config/colors';
import metrics from '../config/metrics';

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
        containerStyle={[ styles.containerStyleMyInput, containerStyle, this.props.style && this.props.style ]}
        placeholderTextColor='gray'
        inputContainerStyle={[styles.inputContainerStyleMyInput, inputContainerStyle]}
        leftIconContainerStyle={[styles.leftIconContainerStyleMyInput, leftIconContainerStyle]}
        labelStyle={[styles.labelStyleMyInput, labelStyle]}
        errorStyle={[styles.error, errorStyle]}
        {...otherProps}
      />
    )
  }
}

const styles = StyleSheet.create({
  containerStyleMyInput: {
    width: '100%',
    marginVertical: 5,
    marginHorizontal: 1,
    paddingHorizontal: 0,
    paddingVertical: 5,
    marginBottom: 10,
  },

  inputContainerStyleMyInput: {
    width: '100%',
    height: 45,
    paddingRight: 10,
    paddingVertical: 0,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  leftIconContainerStyleMyInput: {
    width: '15%',
    height: '100%',
    margin: 0,
    marginLeft: 0,
    marginRight: 5,
    paddingHorizontal: 0,
    paddingLeft: 0,
    alignContent: "space-around",
    backgroundColor: colors.BACKGROUND
  },

  labelStyleMyInput: {
    fontSize: 16,
    color: colors.DEFAULT
  },

  error: {
    fontSize: 14,
    fontWeight: '800',
    color: 'red',
    textAlign: 'left'
  },
});
