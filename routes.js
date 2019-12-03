import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { repairUser } from './src/actions'; 

import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/view/Login';
import SignUp from './src/view/SignUp';
import Forgot from './src/view/Forgot';
import Home from './src/view/Home';
import Details from './src/view/Details';
import Conclude from './src/view/Conclude';
import colors from './src/config/colors';

class Routes extends Component {
  constructor(props) {
		super(props);
  }
  
  async componentDidMount(){
    const user = await AsyncStorage.getItem('@user');
    let result = user ? { ...JSON.parse(user), signed: true } : { signed: false }
    this.props.repairUser(result);
  }

  render(){
    const { user } = this.props;
    const Layout = AppSwitchNavigator(user.signed);
    return(
      <Layout />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      title: 'Home',
    }
  },

  Details: {
    screen: Details,
    navigationOptions:{
      title: 'Details',
      headerStyle: {
        alignContent: 'center'
      }
    }
  },

  Conclude: {
    screen: Conclude,
    navigationOptions:{
      title: 'Conclude',
      headerStyle: {
        alignContent: 'center'
      }
    }
  }
}, {
  defaultNavigationOptions: {
    
    headerStyle: {
      backgroundColor: colors.DEFAULT,
      alignContent: 'center'
    },
    headerTitleStyle: {
      color: colors.LOGO,
      fontSize: 25,
    }
  }
})

const AppSwitchNavigator = (signedIn) => {
  return createAppContainer(
    createSwitchNavigator({
      'LogIn': {
        screen: Login
      },
      'SignUp': {
        screen: SignUp
      },
      'Forgot': {
        screen: Forgot
      },
      'Home': {
        screen: AppStackNavigator
      },
    },
      {
        initialRouteName: signedIn ? 'Home' : 'LogIn',
      })
  );
}

const mapStateToProps = (state) => {
	return ({
    user: state.user,
    signed: state.signed
	})
}

const mapDispatchToProps = {
	repairUser
}



export default connect(mapStateToProps, mapDispatchToProps)(Routes);
