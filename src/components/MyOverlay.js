import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Overlay, OverlayProps } from 'react-native-elements';

import MyButton from './MyButton';

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
          <View style={styles.containerOverLay}>
            <View style={styles.containerHeadOverLay}>
              <Text style={styles.textHeaderOverlay}> {itemSelected && `${itemSelected.model} - ${itemSelected.plate}`.toUpperCase()}</Text>
              <TouchableOpacity onPress={this.setModalVisibleInvisivle}>
                <Icon name='close' size={30} />
              </TouchableOpacity>
            </View>
            <View style={styles.containerBodyOverLay}>
              <Text></Text>
            </View>
            <View style={styles.containerFooterOverLay}>
              <MyButton
                title={strings.EDIT}
                onPress={() => { this.setModalVisibleInvisivle(); this.navigate('Details', { editItem: itemSelected }) }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.WARNING }} />
              <MyButton
                title={strings.DELETE}
                onPress={() => {
                  this.props.deleteVehicle(itemSelected);
                  this.setModalVisibleInvisivle();
                  this.props.watchVehicles();
                }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.DANGER }} />
              <MyButton
                title={strings.CONCLUDE}
                onPress={() => { }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.SUCCESS }} />

            </View>
          </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({

  containerOverLay: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  containerHeadOverLay: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  containerBodyOverLay: {
    flex: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.DEFAULT,
    justifyContent: 'space-between'
  },

  containerFooterOverLay: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around'
  },

  buttonOverlay: {
    flex: 1,
    marginHorizontal: 5
  },

  textHeaderOverlay: {
    fontWeight: 'bold',
    fontSize: 18,

  },

});