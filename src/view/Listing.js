import React, { Component } from 'react';
import { View } from 'react-native';

import MySearchBar from '../components/MySearchBar';
import MyFlatList from '../components/MyFlatList';

import { styles } from '../config/styles';

import { connect } from 'react-redux';
import { watchVehicles, processUpload } from '../actions';

import firebase from 'react-native-firebase';
import MyButton from '../components/MyButton';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      vehicles: []
    }
    this.arrayholder = []
    this.navigate = this.props.navigation.navigate;
  }

  componentDidMount() {
    const { watchVehicles } = this.props;
    watchVehicles();
    this.props.vehicles && (this.arrayholder = [...this.props.vehicles]);
    console.log('componentDidMount', this.props.vehicles)
  }

  searchFilterFunction = text => {
    this.setState({ value: text })
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}${item.status.toUpperCase()}${item.placa.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
  };

  render() {
    let { value } = this.state
    return (
      <View style={styles.container}>
        <MyFlatList
          style={styles.containerFlatList}
          data={this.props.vehicles || []}
          navigation={this.props.navigation}
          ListHeaderComponent={
            <MySearchBar
              placeholder="Pesquisar..."
              round
              autoCorrect={false}
              onChangeText={text => this.searchFilterFunction(text)}
              value={value}
              containerStyle={styles.containerStyleMySearchBar}
            />}
        />

      </View>
    );
  }
}

const mapStateToProps = state => {
  const { listVehicle } = state;
  if (listVehicle == null)
    return { vehicles: listVehicle };

  const keys = Object.keys(listVehicle);
  const listVehicleWithId = keys.map(key => {
    return { ...listVehicle[key], id: key }
  })
  return { vehicles: listVehicleWithId };
}

const mapDispatchToProps = {
  watchVehicles
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
