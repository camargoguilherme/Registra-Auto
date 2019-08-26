import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from 'react-native-elements';
import InputText from '../components/InputText';
import Button from '../components/MyButton';
// import { Container } from './styles';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  onPress = () => {
    
  }

  render() {
    let { loading } = this.state;

    // alert(JSON.stringify(this.state))
    return (
      <View style={styles.container}>
        
        <View style={styles.containerStyle}>
          <InputText 
            placeholder='USERNAME'
            textContentType='username'
            icon='user'
            onChangeText={ () => {} }
            value={''} />  
        
          <InputText 
            placeholder='PASSWORD'
            textContentType='password'
            icon='lock'
            onChangeText={ () => {} }
            value={''}/>
          <Button 
            title="Login"
            onPress={this.onPress}
            loading={loading}
          />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerStyle:{
    width: '80%',
    height: '80%',
    padding: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'transparent'
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
