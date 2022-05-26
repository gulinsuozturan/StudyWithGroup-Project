import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import PomodoroTimer from "../components/PomodoroTimer";


export default class HomeScreen extends React.Component {
 

  componentWillUnmount() {
    this.unsubscribe;
  }

  

  render() {
    return (
      
      <View
        style={{
          flex: 1,
          flexDirection: "column", 
          justifyContent: "center",
          alignItems: "center", 
        }}
      >
        
        <ScrollView style={styles.container}>
          <PomodoroTimer />
        </ScrollView>

      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#eaeef7"
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    paddingLeft: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
