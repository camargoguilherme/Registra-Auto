import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import { Button, ButtonProps } from 'react-native-elements';

type props = ButtonProps;

export default class MyButton extends Component<props> {

  constructor(props) {
    super(props)
    //this.props.onPress = this.props.onPress.bind(this)
  }

  render() {
    const { buttonStyle, containerStyle } = this.props
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          {...this.props}
          onPress={()=>{ this.props.onPress() }}
          buttonStyle={[styles.buttonStyleMyButton, buttonStyle]}
          containerStyle={[styles.containerStyleMyButton, containerStyle]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyleMyButton: {
    flex: 1,
    width: '100%',
    height: 50,
    alignItems: 'center',
  },

  containerStyleMyButton: {
    flex: 0.5,
    flexDirection: 'row',
  },
})
