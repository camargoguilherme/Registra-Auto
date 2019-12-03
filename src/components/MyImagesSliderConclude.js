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

import colors from '../config/colors';
import metrics from '../config/metrics';

import { connect } from 'react-redux';
import { selectPhotoTapped, deleteImage, setAllImages } from '../actions';
import strings from '../config/strings';

type props = FlatListProps;

class MyImagesSliderConclude extends Component<props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setAllImages(this.props.vehicle['images']);
    this.props.images = this.props.vehicle['images'];
  }

  renderItem(item) {
    return (
      <View key={item['id']} style={styles.itemImagesSlider}>
        <View style={styles.containerItemImageSlider}>
          <ImageBackground
            resizeMode={'stretch'}
            style={styles.image}
            source={{ cache: 'only-if-cached', uri: item['url'] }}>
          </ImageBackground>
        </View>
      </View>
    );
  }

  render() {
    let images = this.props.images.filter(item => !!item);
    return (
      <View style={styles.containerImagesSlider}>
        <FlatList
          data={images}
          horizontal
          renderItem={({ item }) => this.renderItem(item)}
          keyExtractor={({ id }) => `${id}`} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerImagesSlider: {
    height: '100%',
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
    width: metrics.DEVICE_WIDTH * .75,
    height: metrics.DEVICE_WIDTH * .6,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const mapStateToProps = ({ vehicle, images }) => {
  return { ...vehicle, ...images, vehicle: vehicle['vehicle'], images: images['images'] };
}

const mapDispatchToProps = {
  selectPhotoTapped,
  deleteImage,
  setAllImages
}

export default connect(mapStateToProps, mapDispatchToProps)(MyImagesSliderConclude);
