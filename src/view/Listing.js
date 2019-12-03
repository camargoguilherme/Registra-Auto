import React, { Component } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';

import MySearchBar from '../components/MySearchBar';
import MyFlatList from '../components/MyFlatList';

import colors from '../config/colors';

import { connect } from 'react-redux';
import { watchVehicles } from '../actions';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.arrayholder = []
    this.navigate = this.props.navigation.navigate;
  }

  componentDidMount() {
    this.props.watchVehicles();
  }

  setVehicles(){
    if(!this.state.value){
      this.arrayholder = [...this.props.vehicles]
    }
  }

  searchFilterFunction = text => {
    this.setState({ value: text })
    const newData = this.props.vehicles.filter(item => {
      return `${item.entryDate}${item.type}${item.color}${item.plate}${item.model}${item.status? 'CLOSE' : 'OPEN'}`.toUpperCase().includes(text.toUpperCase());
    });
    this.arrayholder = [...newData];
  };

  render() {
    this.setVehicles();
    return (
      <View style={styles.container}>
        <MyFlatList
          style={styles.containerFlatList}
          data={this.arrayholder}
          navigation={this.props.navigation}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isLoadingVehicles}
              onRefresh={this.props.watchVehicles }
            />
          }
          ListHeaderComponent={
            <MySearchBar
              placeholder="Pesquisar..."
              round
              autoCorrect={false}
              onChangeText={this.searchFilterFunction}
              value={this.state.value}
              containerStyle={styles.containerStyleMySearchBar}
            />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.BACKGROUND,
  },

  containerFlatList: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.BACKGROUND,
  },

  containerStyleMySearchBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
});

const mapStateToProps = ({ vehicle, images }) => {
	return { ...vehicle, ...images, vehicles: vehicle['vehicles'], images: images['images'] };
}

const mapDispatchToProps = {
  watchVehicles
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
