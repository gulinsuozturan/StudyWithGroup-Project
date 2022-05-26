import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EtkinlikOlustur from "../screens/EtkinlikOlustur";
import MyDrawer from "./Drawer";


const Stack = createStackNavigator();

const CalendarStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Etkinlik" component={EtkinlikOlustur} />
    </Stack.Navigator>
  );
}

export default CalendarStack;