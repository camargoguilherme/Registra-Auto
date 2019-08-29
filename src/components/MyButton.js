import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, ButtonProps } from 'react-native-elements';

type Props = ButtonProps;

export default class MyButton extends Component<Props> {

  constructor(props) {
    super(props)
  }

  render() {
    let { buttonStyle, ...otherProps } = this.props
    
    return (
      <Button
        buttonStyle={[styles.buttonStyle, buttonStyle]}
        {...otherProps}

      />
    )
  }

}

// let width = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.8
// let height = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.1

const styles = StyleSheet.create({

  buttonStyle: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderRadius: 100,    
  },
});