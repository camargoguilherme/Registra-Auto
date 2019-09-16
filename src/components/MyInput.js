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
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Input
          containerStyle={styles.containerStyleMyInput}
          inputContainerStyle={styles.inputContainerStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          errorStyle={styles.error}
          {...this.props}
        />
      </View>
    )
  }
}
