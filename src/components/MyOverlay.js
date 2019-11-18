import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Overlay, OverlayProps } from 'react-native-elements';

type props = OverlayProps;

export default class MyOverlay extends Component<props> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Overlay
        transparent={true}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        width="80%"
        height="35%"
        {...this.props}>
      </Overlay>
    );
  }
}
