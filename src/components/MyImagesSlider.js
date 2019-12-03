import React, { Component } from 'react';
import {
  View,
  Alert,
  FlatList,
  ImageBackground,
  FlatListProps,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../config/colors';
import metrics from '../config/metrics';

import { connect } from 'react-redux';
import { selectPhotoTapped, deleteImage, setAllImages } from '../actions';
import strings from '../config/strings';

type props = FlatListProps;

class MyImagesSlider extends Component<props> {
  constructor(props) {
    super(props);
  }

  showAlert = (idImage) => {
    Alert.alert(
      strings.DELETE,
      strings.REMOVE_IMAGE,
      [
        {
          text: strings.CANCEL,
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.removeImage(idImage) },
      ],
      { cancelable: false },
    )
  }

  componentDidMount() {
    if (this.props.isEdit) {
      this.props.setAllImages(this.props.vehicle['images']);
      this.props.images = this.props.vehicle['images'];
    } else {
      this.props.setAllImages();
    }
  }

  removeImage(idImage) {
    this.props.deleteImage(this.props.vehicle['id'], idImage);
  }

  renderItem(item) {
    return (
      <View key={item['id']} style={styles.itemImagesSlider}>
        <View style={styles.containerItemImageSlider}>
          <ImageBackground
            resizeMode={'stretch'}
            style={styles.image}
            source={{ cache: 'only-if-cached', uri: item['url'] }}>
            <TouchableOpacity
              style={styles.deleteItemImageSlider}
              onPress={() => this.showAlert(item['id'])}>
              <Icon name='trash' size={25} color={styles.deleteItemImageSlider.borderColor} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    let images = this.props.images.filter( item => !!item);
    return (
      <View>
        <View style={styles.containerImagesSlider}>
          <FlatList
            data={images}
            horizontal
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={({ id }) => `${id}`} />
        </View>
        <TouchableOpacity
          style={styles.cameraImageSlider}
          onPress={() =>
            this.props.selectPhotoTapped(this.props.vehicle['id'])
          }>
          <Icon name='camera' size={35} color={styles.cameraImageSlider.borderColor} />
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerImagesSlider: {
    height: '70%',
    borderWidth: 2.5,
    borderColor: colors.SILVER,
    backgroundColor: colors.DEFAULT,
    paddingVertical: 0,
  },

  itemImagesSlider: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  containerItemImageSlider: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  image: {
    width: metrics.DEVICE_WIDTH * .2,
    height: metrics.DEVICE_WIDTH * .2,
    justifyContent: 'center',
    alignItems: 'center'
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

const mapStateToProps = ({ vehicle, images }) => {
  return { ...vehicle, ...images, vehicle: vehicle['vehicle'], images: images['images'] };
}

const mapDispatchToProps = {
  selectPhotoTapped,
  deleteImage,
  setAllImages
}

export default connect(mapStateToProps, mapDispatchToProps)(MyImagesSlider);
