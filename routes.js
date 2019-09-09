import {
  createStackNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator
} from 'react-navigation';

import Login  from './src/view/Login'
import SignUp  from './src/view/SignUp'
import Forget  from './src/view/Forget'


const AppSwitchNavigator = (signedIn) =>{
  return createSwitchNavigator({
  'LogIn': {
    screen: Login
  },
  'SignUp': {
    screen: SignUp
  },
  'Forget': {
    screen: Forget
  }
},
  {
    initialRouteName: signedIn ? 'Home' : 'LogIn',
  });
} 

export default AppSwitchNavigator;