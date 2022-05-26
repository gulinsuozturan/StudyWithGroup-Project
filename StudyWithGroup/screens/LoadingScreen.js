import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = async () => {
    const token = await SecureStore.getItemAsync('jwt');
    console.log("------");
    console.log(token);
    console.log("------");
    if (token != undefined && token != '' && token != null) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
