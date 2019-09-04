import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import colors from './src/config/colors';

import AppSwitchNavigator from './routes';

import {  createAppContainer } from 'react-navigation';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signed: false,
      signLoaded: false,
    }
  }

  async componentDidMount() {

    this.setState({ signLoaded: true })

  }

  render() {
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = createAppContainer(AppSwitchNavigator(signed));
    return (
      <View style={{ flex: 1 }}>
        {/* <OfflineNotice />  */}
        <Layout />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
