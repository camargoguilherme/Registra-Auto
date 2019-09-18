import React, { Component } from 'react';
import { View, Text, FlatList, ImageBackground, FlatListProps, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { styles } from '../config/styles';
import { selectPhotoTapped } from '../services/UploadImage';

type props = FlatListProps;

export default class MyImagesSlider extends Component<props> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      itemSelected: {
        id: '',
        url: ''
      }
    };
  }

  setItemSelected = (itemSelected) => this.setState({ itemSelected })

  removeItem = ({ id }) => {
    let result = this.state.data.filter(item => item.id !== id)
    this.setState({ data: result })
  }

  renderItem = (item) => {
    return (
      <View style={styles.itemImagesSlider}>
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
    let { isVisible, itemSelected, data } = this.state
    return (
      <View>
        <View style={styles.containerImagesSlider}>
          <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={({ id, title }) => id + title}
            initialScrollIndex={this.props.data && parseInt(this.props.data.length / 2)} />
        </View>
        <TouchableOpacity
          style={styles.cameraImageSlider}
          onPress={ () => selectPhotoTapped(foto => {
           //this.setState(prevState => ({ data: [...foto, prevState.data]}))
          })
          }>
          <Icon name='camera' size={35} color={styles.cameraImageSlider.borderColor} />
        </TouchableOpacity>
      </View>
    );
  }
}
