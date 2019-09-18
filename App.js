import React, { Component } from 'react';

import AppSwitchNavigator from './routes';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signed: !false,
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

    const Layout = AppSwitchNavigator(signed);
    return (
      <Layout />
    )
  }
}
