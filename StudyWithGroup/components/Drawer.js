import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import HesapScreen from '../screens/HesapScreen';
import Calendar from '../screens/Calendar';
import GruplarStack from './GruplarStack';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CalendarStack from './CalendarStack';
import * as SecureStore from 'expo-secure-store';
import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import TumGruplar from '../screens/TumGruplar'

const Drawer = createDrawerNavigator();


export default function MyDrawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator >
                <Drawer.Screen name="HADİ BAŞLAYALIM!" component={HomeScreen} />
                <Drawer.Screen name="Etkinliklerim" component={Calendar}/>
                <Drawer.Screen name="Gruplarım" component={GruplarStack} options={{ headerShown: false,}} />
                <Drawer.Screen name="Tüm Gruplar" component={TumGruplar}/>
                <Drawer.Screen name="Çıkış Yap" component={HesapScreen}  options={{ headerShown: false }} />
                <Drawer.Screen name="Etkinlik" component={CalendarStack}  options={{ headerShown: false, drawerLabel: () => null,
                title: null, drawerIcon: () => null }} />
                <Drawer.Screen name="Loading" component={LoadingScreen}  options={{ headerShown: false, drawerLabel: () => null,
                title: null, drawerIcon: () => null }} />
                <Drawer.Screen name="Login" component={LoginScreen}  options={{ headerShown: false, drawerLabel: () => null,
                title: null, drawerIcon: () => null }} />

            </Drawer.Navigator>
        </NavigationContainer>
    );
}
