import React, { Component } from 'react';
import { View, Picker, PickerProps, Text } from 'react-native';

import { styles } from '../config/styles';
import strings from '../config/strings';
import colors from '../config/colors';

type props = PickerProps;

export default class MyPicker extends Component<props> {
  constructor(props) {
    super(props);

  }
  render() {
    let { data, otherProps } = this.props;

    return (
      <View style={styles.containerMyPicker}>
        <Text style={styles.labelStyleMyPicker}>{strings.TYPE}</Text>
        <Picker
          style={styles.containerStyleMyPicker}
          {...otherProps}>
          {data.map((item, index) => {
            return <Picker.Item key={item.value + index} {...item} />
          })}
        </Picker>
      </View>
    );
  }
}
