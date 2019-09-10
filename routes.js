import {
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import Login  from './src/view/Login'
import SignUp  from './src/view/SignUp'
import Forgot  from './src/view/Forgot'

const AppStackNavigator;

const AppSwitchNavigator = (signedIn) =>{
  return createSwitchNavigator({
  'LogIn': {
    screen: Login
  },
  'SignUp': {
    screen: SignUp
  },
  'Forgot': {
    screen: Forgot
  }
},
  {
    initialRouteName: signedIn ? 'Home' : 'LogIn',
  });
} 

export default AppSwitchNavigator;