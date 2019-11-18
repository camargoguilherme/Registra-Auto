import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  FlatListProps,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../config/colors';

import { connect } from 'react-redux';
import { selectPhotoTapped } from '../actions';

type props = FlatListProps;

class MyImagesSlider extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      itemSelected: {
        id: '',
        url: ''
      }
    };
  }

  setItemSelected = (itemSelected) => this.setState({ itemSelected })

  removeItem = ({ id }) => {
    let result = this.props.images.filter(item => item.id !== id)
    this.setState({ data: result })
  }

  renderItem = (item) => {
    return (
      <View key={item.id} style={styles.itemImagesSlider}>
        <View style={styles.containerItemImageSlider}>
          <ImageBackground
            resizeMode={'cover'}
            style={styles.image}
            source={{ uri: item.url }}>
            <TouchableOpacity
              style={styles.deleteItemImageSlider}
              onPress={() => this.removeItem(item)}
            >
              <Icon name='trash' size={25} color={styles.deleteItemImageSlider.borderColor} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    let { isVisible, itemSelected, data } = this.state;
    const { selectPhotoTapped } = this.props
    return (
      <View>
        <View style={styles.containerImagesSlider}>
          <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={({ id }) => id} />
        </View>
        <TouchableOpacity
          style={styles.cameraImageSlider}
          onPress={() =>
            // selectPhotoTapped(foto => {
            //   console.log('MyImageSlider:selectPhotoTapped', foto);
            //   this.setState({ data: [...this.state.data, foto] });
            //   data && console.log('index', parseInt(data.length / 2))
            //   console.log('length', data.length)
            // })
            selectPhotoTapped()
          }>
          <Icon name='camera' size={35} color={styles.cameraImageSlider.borderColor} />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerImagesSlider: {
    height: '75%',
    borderWidth: 2.5,
    borderColor: colors.SILVER,
    backgroundColor: colors.DEFAULT,
    paddingVertical: 0,
  },

  itemImagesSlider: {
    height: '35%',
    width: '30%',
    marginHorizontal: 10,
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
  },

  containerItemImageSlider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  deleteItemImageSlider: {
    height: '50%',
    width: '50%',
    borderColor: colors.DANGER,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  cameraImageSlider: {
    bottom: 0,
    left: '85%',
    width: 40,
    height: 40,
    borderColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = ({ image }) => {
  console.log('images', image)
  return { images: image['images']};
}

const mapDispatchToProps = {
  selectPhotoTapped
}

export default connect(mapStateToProps, mapDispatchToProps)(MyImagesSlider);
