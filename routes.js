import {
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import Login  from './src/view/Login'
import SignUp  from './src/view/SignUp'


const AppSwitchNavigator = (signedIn) =>{
  return createSwitchNavigator({
  'Login': {
    screen: Login
  },
  'SignUp': {
    screen: SignUp
  },
  'Forgot': {
    screen: Login
  }
},
  {
    initialRouteName: signedIn ? 'Home' : 'Login',
  });
} 

export default AppSwitchNavigator;