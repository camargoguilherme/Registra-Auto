import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import { styles } from '../config/styles';
import colors from '../config/colors';

import Details from '../view/Details';
import Listing from '../view/Listing';
import Login from '../view/Login';
import { translate } from '../locales';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 1
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  renderScreen = (index) => {
    switch (index) {
      case 0:
        return (
          <Details />
        );
      case 1:
        return (
          <Listing {...this.props} />
        );
      case 2:
        return (
          <Login {...this.props} />
        );
    }
  }

  render() {
    const buttons = [translate('REGISTER'), translate('LISTING')]
    const { selectedIndex } = this.state
    return (
      <View style={{ height: '100%', backgroundColor: colors.BACKGROUND }}>
        <ButtonGroup
          buttonStyle={styles.buttonStyleGB}
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          selectedButtonStyle={styles.selectedButtonStyleGroupButtons}
          selectedTextStyle={styles.selectedTextStyleGroupButtons}
          disabledTextStyle
          buttons={buttons}
          containerStyle={styles.containerStyleGroupButtons} />
        <View style={{ flex: 1 }}>
          {this.renderScreen(selectedIndex)}
        </View>
      </View>
    )
  }
}
