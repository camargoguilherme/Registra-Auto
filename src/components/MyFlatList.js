import React, { Component } from 'react';
import { View, Text, FlatList, Image, FlatListProps, TouchableOpacity } from 'react-native';
import MyOverlay from './MyOverlay';

import { styles } from '../config/styles';
import strings from '../config/strings';
import MyButton from './MyButton';
import colors from '../config/colors';
import { Icon } from 'react-native-elements';

type props = FlatListProps;

export default class MyFlatList extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      isVisible: false,
      itemSelected: {
        id: '',
        name: 'TESTE TESTE',
        placa: 'AAA-1234',
        entrada: '',
        status: '',
        url: ''
      }
    };
    this.arrayholder = [...this.props.data];
    this.navigate = this.props.navigation.navigate;
  }


  setModalVisibleInvisivle = () => this.setState(prevState => ({ isVisible: !prevState.isVisible }))

  setItemSelected = (itemSelected) => this.setState({ itemSelected })

  renderItem = (item) => {

    return (
      // implemented without image with header
      <TouchableOpacity
        style={styles.item}
        onPressIn={() => this.setItemSelected(item)}
        onLongPress={this.setModalVisibleInvisivle}>
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{ uri: item.url }}>
        </Image>
        <View style={styles.contentInfor}>
          <View style={styles.itemInfo}>
            <Text style={styles.textPlaca}>{item.placa}</Text>
            <Text style={styles.textModelo}>{item.name}</Text>
            <View style={styles.containerStatus}>
              <Text style={styles.itemTitulo}>{item.entrada}</Text>
              <Text style={styles.itemTitulo}>{item.status}</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.buttonInfo}
            onPress={() => { this.navigate('Details') }}
            onLongPress={() => this.setState(prevState => ({ isVisible: !prevState.isVisible }))}>
            <Text style={styles.textButton}>Details</Text>
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let { isVisible, itemSelected } = this.state
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <MyOverlay isVisible={isVisible}>
          <View style={styles.containerOverLay}>
            <View style={styles.containerHeadOverLay}>
              <Text style={styles.textHeaderOverlay}>{itemSelected.name} - {itemSelected.placa}</Text>
              <TouchableOpacity onPress={this.setModalVisibleInvisivle}>
                <Icon name='close' size={30}/>
              </TouchableOpacity>
            </View>
            <View style={styles.containerBodyOverLay}>
              <Text></Text>
            </View>
            <View style={styles.containerFooterOverLay}>
              <MyButton
                title={strings.EDIT}
                onPress={() => { this.setModalVisibleInvisivle(); this.navigate('Details') }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.WARNING }} />
              <MyButton
                title={strings.DELETE}
                onPress={() => { }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.DANGER }} />
              <MyButton
                title={strings.CONCLUDE}
                onPress={() => { }}
                containerStyle={styles.buttonOverlay}
                buttonStyle={{ backgroundColor: colors.SUCCESS }} />

            </View>
          </View>
        </MyOverlay>
        <FlatList
          {...this.props}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={({ id, title }) => id + title} />
      </View>
    );
  }
}
