import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import MySearchBar from '../components/MySearchBar';
import MyFlatList from '../components/MyFlatList';

import colors from '../config/colors';

import { connect } from 'react-redux';
import { watchVehicles, processUpload } from '../actions';

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
  }

  componentDidUpdate() {
    const { watchVehicles } = this.props;
    watchVehicles();
    this.props.vehicles && (this.arrayholder = [...this.props.vehicles]);
  }

  searchFilterFunction = text => {
    this.setState({ value: text })
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name}${item.status}${item.placa}`.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    if (text) {
      this.arrayholder = [...newData];
    } else {
      this.props.vehicles && (this.arrayholder = [...this.props.vehicles]);
    }
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

const mapStateToProps = ({ vehicle }) => {
  return { vehicles: vehicle['vehicles'] };
}

const mapDispatchToProps = {
  watchVehicles
}

export default connect(mapStateToProps, mapDispatchToProps)(Listing);
