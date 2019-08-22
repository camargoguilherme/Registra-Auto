import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';

export default class InputText extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
    this.onChangeText = this.onChangeText.bind(this)
  }

  onChangeText = (text) => {
    this.props.onChangeText(text)
    this.setState({value: text})
  }

  render() {
    let { placeholder, value, icon } = this.state
    return (
      <Input
        placeholder={placeholder}
        errorMessage={'Preencha o campo'}
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        errorStyle={styles.error}
        value={value}
        onChangeText={this.onChangeText}
        leftIcon={
          <Icon
            name={icon}
            size={24}
            color='gray'
          />
        }
      />
    )
  }

}

// let width = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.8
// let height = (WIDTH<HEIGHT?WIDTH:HEIGHT) * 0.1

const styles = StyleSheet.create({

  containerStyle: {
    padding: 2,
    width: '100%',
    height: 85
  },
  inputContainerStyle: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: 2,
  },
  leftIconContainerStyle: {

    alignContent: "space-around"
  },

  error: {
    color: 'red',
    textAlign: 'center'
  },

});