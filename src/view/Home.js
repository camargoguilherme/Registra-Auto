import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

import colors from '../config/colors';

import Details from '../view/Details';
import Listing from '../view/Listing';
import Login from '../view/Login';
import { translate } from '../locales';


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(index) {
    this.setState({ selectedIndex: index })
  }

  renderScreen = (index) => {
    switch (index) {
      case 0:
        return (
          <Details {...this.props} />
        );
      case 1:
        return (
          <Listing {...this.props} />
        );
    }
  }

  render() {
    const buttons = [translate('REGISTER'), translate('LISTING')]
    const { selectedIndex } = this.state
    return (
      <KeyboardAvoidingView 
        style={{ height: '100%', backgroundColor: colors.BACKGROUND }}
        behavior='padding'>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          containerStyle={styles.containerStyleGroupButtons}
          buttonStyle={styles.buttonStyleGroupButtons}
          selectedButtonStyle={styles.selectedButtonStyleGroupButtons}
          selectedTextStyle={styles.selectedTextStyleGroupButtons}
          textStyle={styles.textStyleGroupButtons}
          buttons={buttons} />
        <View style={{ flex: 1 }}>
          {this.renderScreen(selectedIndex)}
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  containerStyleGroupButtons: {
    height: 30
  },

  buttonStyleGroupButtons: {
    backgroundColor: colors.BACKGROUND,
  },

  selectedButtonStyleGroupButtons: {
    backgroundColor: colors.WHITE
  },

  selectedTextStyleGroupButtons: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.BACKGROUND,
  },

  textStyleGroupButtons: {
    fontWeight: '400',
    color: colors.WHITE,
  },

})
