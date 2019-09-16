import React, { Component } from 'react';
import { View } from 'react-native';

import MySearchBar from '../components/MySearchBar';
import MyFlatList from '../components/MyFlatList';

import { styles } from '../config/styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Chevrolet 3100',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Chevrolet_3100.JPG/800px-Chevrolet_3100.JPG'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Chevrolet Astra',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Chevrolet_Astra_2.0_GLS_2006_%2816088287360%29.jpg/800px-Chevrolet_Astra_2.0_GLS_2006_%2816088287360%29.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Chevrolet Blazer',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2019_Chevrolet_Blazer_RS_3.6L%2C_front_8.18.19.jpg/1280px-2019_Chevrolet_Blazer_RS_3.6L%2C_front_8.18.19.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    name: 'Chevrolet Veraneio',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Chevrolet_car_in_Avenida_Paulista.jpg/800px-Chevrolet_car_in_Avenida_Paulista.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    name: 'Chevrolet D-20',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chevrolet_C-20_Crew_Cab_1993_%2816844862924%29.jpg/800px-Chevrolet_C-20_Crew_Cab_1993_%2816844862924%29.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    name: 'Chevrolet Camaro',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg/1024px-2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b6',
    name: 'Chevrolet Caravan',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Chevrolet_Opala_Caravan_late.jpg/1280px-Chevrolet_Opala_Caravan_late.jpg'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f67',
    name: 'Chevrolet Celta',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Chevrolet_Celta_2013.jpg/800px-Chevrolet_Celta_2013.jpg'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d78',
    name: 'Chevrolet Chevette',
    placa: 'AAA-0000',
    entrada: '25/06/2019 16:45:00',
    status: 'OPEN',
    url: 'https://upload.wikimedia.org/wikipedia/pt/2/2e/Chevette_1985.png'
  },
];



export default class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [...DATA],
    }
    this.arrayholder = [...DATA]
    this.navigate = this.props.navigation.navigate;
  }

  searchFilterFunction = text => {
    this.setState({ value: text })
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}${item.status.toUpperCase()}${item.placa.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.includes(textData);
    });
    this.setState({
      data: newData,
    });
  };

  render() {
    let { value, data } = this.state
    return (
      <View style={styles.container}>
        <MyFlatList
          style={styles.containerFlatList}
          data={data}
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
