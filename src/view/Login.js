import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import InputText from '../components/InputText';
// import { Container } from './styles';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        
        <InputText 
          placeholder='USERNAME'
          icon='user'
          onChangeText={ () => {} }
          value={''}/>
        
        <InputText 
          placeholder='PASSWORD'
          icon='lock'
          onChangeText={ () => {} }
          value={''}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
  },
  containerStyle:{
    padding: 2,
    width: '100%',
    height: 85
  },
  inputContainerStyle: {
    flex: 1,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 100,
    borderWidth: 2,   
  },
  leftIconContainerStyle: {

    alignContent: "space-around"
  }
});
