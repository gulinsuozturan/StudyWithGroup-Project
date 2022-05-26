import React from "react";
import { StyleSheet, Text, View } from "react-native";

class TimerDisplay extends React.Component {
  componentWillUnmount() {
    this.unsubscribe;
  }
  // display currently running timer
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {Math.floor(this.props.time / 60)
            .toString()
            .padStart(2, "0") +
            ":" +
            (this.props.time % 60).toString().padStart(2, "0")}
        </Text>
      </View>
    );
  }
}

export default TimerDisplay;

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    marginBottom: "10%",
    marginLeft: "7%",
    marginRight: "7%",
    padding: "10%",
    borderColor: "white",
    borderRadius: 5,
    borderWidth: 5,
    alignItems: "center",
    backgroundColor: "#2157DD",
  },
  textStyle: {
    color: "white",
    fontSize: 50,
    fontWeight: "400",
  },
});
