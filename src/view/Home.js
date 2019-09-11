import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, Text } from 'react-native';
import { styles } from '../config/styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    title: 'Fourth Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Sixth Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b6',
    title: 'Seventh Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f67',
    title: 'Eighth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    title: 'Ninth Item',
  },
];

function Item({ title }) {
  return (
    <View style={styles.itemList}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.containerFlatList}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}
