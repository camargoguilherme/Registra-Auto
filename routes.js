import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/view/Login';
import SignUp from './src/view/SignUp';
import Forgot from './src/view/Forgot';
import Home from './src/view/Home';
import Details from './src/view/Details';
import colors from './src/config/colors';

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
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: 'rgba(255, 255, 255, 0.4)',
    headerStyle: {
      backgroundColor: colors.WHITE,
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

export default AppSwitchNavigator;
