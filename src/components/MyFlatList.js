import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  FlatListProps,
  TouchableOpacity,
  StyleSheet
} from 'react-native';



import strings from '../config/strings';
import colors from '../config/colors';
import logo from '../assets/images/logo.png';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { Icon, Badge } from 'react-native-elements';

import { connect } from 'react-redux';
import { deleteVehicle, watchVehicles } from '../actions';

type props = FlatListProps;

class MyFlatList extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected : {}
    }

    this.arrayholder = [...this.props.data];
    this.navigate = this.props.navigation.navigate;
  }

  options = () => {
    Alert.alert(
      `${this.state.itemSelected.model} - ${this.state.itemSelected.plate}`.toUpperCase(),
      strings.OPTIONS_ITEM_MESSAGE,
      [
        {
          text: strings.DELETE,
          onPress: async () => {
            this.props.deleteVehicle(this.state.itemSelected['id']);
            this.props.watchVehicles();
          },
          style: 'destructive',
        },
        {
          text: strings.EDIT,
          onPress: () => { this.navigate('Details', { vehicle: this.state.itemSelected }) },
          style: 'editar',
        },
        {
          text: strings.CONCLUDE, onPress: () => { }
        },
      ],
      { cancelable: true },
    )
  }

  setModalVisibleInvisivle = () => this.setState(prevState => ({ isVisible: !prevState.isVisible }))

  setItemSelected = (itemSelected) => this.setState({ itemSelected })

  renderItem = ( item ) => {
    const { plate, model, entryDate, images, status } = item;
    return (
      // implemented without image with header
      <View
        style={styles.item}>
        <Image
          resizeMode={'cover'}
          style={styles.image}
          defaultSource={logo}
          source={{ uri: (images && images[0].url) }}>
        </Image>
        <View style={styles.contentInfor}>
          <View style={styles.itemInfo}>
            <Text style={styles.textPlaca}>{`${plate}`.toUpperCase()}</Text>
            <Text style={styles.textModelo}>{`${model}`.toUpperCase()}</Text>
            <View style={styles.containerStatus}>
              <Text style={styles.itemTitulo}>{entryDate}</Text>
              <Badge status={status?'error':'success'} value={<Text style={styles.itemBadge}>{`${status?'CLOSE':'OPEN'}`.toUpperCase()}</Text>} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.options}
          onPressIn={() => this.setItemSelected(item)}
          onPress={this.options}>
          <IconFontAwesome5 name='ellipsis-v' size={25} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
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

  contentInfor: {
    flex: 2,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  itemInfo: {
    flex: 2,
    marginHorizontal: 5,
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
  },

  itemTitulo: {
    fontSize: 16
  },

  itemBadge: {
    padding: 5,
    fontSize: 16
  },

});

const mapStateToProps = ({ vehicle, images }) => {
	return { vehicle: vehicle['vehicle'], images: images['images'] };
}

const mapDispatchToProps = {
  deleteVehicle,
  watchVehicles
}

export default connect( mapStateToProps, mapDispatchToProps)(MyFlatList);
