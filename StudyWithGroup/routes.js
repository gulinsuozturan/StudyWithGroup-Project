import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerScreen from './components/Drawer';
import EtkinlikOlustur from './screens/EtkinlikOlustur';
import HesapScreen from './screens/HesapScreen';

import 'react-native-gesture-handler';

const AuthStack = createStackNavigator(
    {
        Login:LoginScreen,
        Register:RegisterScreen,
        Etkinlik:EtkinlikOlustur,
        Loading:LoadingScreen,
        
    },
    {
        headerMode: 'none',
    }
)

export default createAppContainer(
  createSwitchNavigator({
    Loading:LoadingScreen,
    Auth:AuthStack,
    App:DrawerScreen,
  },
  {
    initialRouteName:"Loading"
  })
)
