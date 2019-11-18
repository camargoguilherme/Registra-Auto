import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  FlatListProps,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import MyOverlay from './MyOverlay';

import strings from '../config/strings';
import MyButton from './MyButton';
import colors from '../config/colors';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { Icon, Badge } from 'react-native-elements';

import { connect } from 'react-redux';
import { deleteVehicle, watchVehicles } from '../actions';

type props = FlatListProps;

class MyFlatList extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      itemSelected: {}
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
        style={styles.item}>
        <Image
          resizeMode={'cover'}
          style={styles.image}
          source={{ uri: item.url }}>
        </Image>
        <View style={styles.contentInfor}>
          <View style={styles.itemInfo}>
            <Text style={styles.textPlaca}>{`${item.plate}`.toUpperCase()}</Text>
            <Text style={styles.textModelo}>{`${item.model}`.toUpperCase()}</Text>
            <View style={styles.containerStatus}>
              <Text style={styles.itemTitulo}>{item.entry_date}</Text>
              <Badge status="success" value={<Text style={styles.itemTitulo}>{`${item.status}`.toUpperCase()}</Text>} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.options}
          onPressIn={() => this.setItemSelected(item)}
          onPress={this.setModalVisibleInvisivle}>
          <IconFontAwesome5 name='ellipsis-v' size={25} />
        </TouchableOpacity>
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
        </MyOverlay>
        <FlatList
          {...this.props}
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={({ id, title }) => `${id}-${title}`} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  item: {
    minHeight: 75,
    maxHeight: 95,
    height: 85,
    margin: 8,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row'
  },

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

  contentInfor: {
    flex: 2,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  itemInfo: {
    flex: 2,
    justifyContent: 'space-between',

  },

  options: {
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  },

  buttonInfo: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textButton: {
    justifyContent: 'center',
    color: colors.PRIMARY
  },

  textPlaca: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerStatus: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },

  itemTitulo: {
    marginHorizontal: 5,
    fontSize: 16
  },

});

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = {
  deleteVehicle,
  watchVehicles
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFlatList);
