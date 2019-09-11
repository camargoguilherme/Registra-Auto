import {
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/view/Login'
import SignUp from './src/view/SignUp'
import Forgot from './src/view/Forgot'
import Home from './src/view/Home'

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
}, {
  defaultNavigationOption: {
    title: 'Home'
  }
})

export default AppSwitchNavigator = (signedIn) => {
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
