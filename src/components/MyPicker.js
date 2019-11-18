import React, { Component } from 'react';
import { 
  View,
  Picker,
  PickerProps,
  Text,
  StyleSheet 
} from 'react-native';

import colors from '../config/colors';

type props = PickerProps;

export default class MyPicker extends Component<props> {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={[styles.containerMyPicker, this.props.styles && this.props.styles]}>
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

const styles = StyleSheet.create({
  containerMyPicker: {
    width: '100%',
    marginBottom: 10,
  },

  labelStyleMyPicker: {
    fontSize: 16,
    marginBottom: 1,
    fontWeight: 'bold',
    color: colors.DEFAULT,
  },

  containerStyleMyPicker: {
    width: '100%',
    height: 45,
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth * 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },

});
