import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GruplarScreen from "../screens/GruplarScreen";
import GruplarDetayScreen from "../screens/GruplarDetayScreen";
import TumGruplar from "../screens/TumGruplar"
// import GruplarDetayScreen from "../screens/GruplarDetayScreen";


const Stack = createStackNavigator();

const GruplarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Gruplarım" component={GruplarScreen} />
      <Stack.Screen name="Grup Detay" component={GruplarDetayScreen} />
    </Stack.Navigator>
  );
}

export default GruplarStack;
