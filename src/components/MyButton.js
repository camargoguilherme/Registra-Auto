import React, { Component } from 'react';
import {
  View
} from 'react-native';

import { Button, ButtonProps } from 'react-native-elements';
import { styles } from '../config/styles'

type props = ButtonProps;

export default class MyButton extends Component<props> {

  constructor(props) {
    super(props)
  }

  render() {
    const { buttonStyle, containerStyle } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          {...this.props}
          buttonStyle={[styles.buttonStyleMyButton, buttonStyle]}
          containerStyle={[styles.containerStyleMyButton, containerStyle]}
        />
      </View>
    )
  }
}
