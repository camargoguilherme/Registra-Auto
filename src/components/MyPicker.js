import React, { Component } from 'react';
import { View, Picker, PickerProps, Text } from 'react-native';

import { styles } from '../config/styles';

type props = PickerProps;

export default class MyPicker extends Component<props> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.containerMyPicker}>
        <Text style={styles.labelStyleMyPicker}>{this.props.label}</Text>
        <Picker
          style={styles.containerStyleMyPicker}
          {...this.props}>
          {
            this.props.data.map((item, index) => {
              return <Picker.Item key={item.value + index} {...item}/>
            })  
          }
        </Picker>
      </View>
    );
  }
}
