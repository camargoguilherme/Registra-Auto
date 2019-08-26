import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';

export default class MyButton extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      ...props,
      loading: false
    }
  }

  onPress = () => {
    this.setState({ loading: true })
    setTimeout( () =>{ this.setState({ loading: false }) }, 5000 )
    this.props.onPress()
  }

  render() {
    let { title, loading, buttonStyle } = this.state
    
    return (
      <Button
        title={title}
        buttonStyle={[styles.buttonStyle, buttonStyle]}
        onPress={this.onPress}
        loading={loading}
        disabled={loading}
        disabledStyle={styles.loadingStyle}
        loadingStyle={styles.loadingStyle}

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

  loadingStyle: {
    flex: 1,
    backgroundColor: 'red',
  }
});