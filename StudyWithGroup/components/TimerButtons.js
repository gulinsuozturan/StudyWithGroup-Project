import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

class TimerButtons extends React.Component {
  state = {};

  componentWillUnmount() {
    this.unsubscribe;
  }

  //renders pause, play and reset buttons
  render() {
    if (this.props.running === true) {
      return (
        <View style={styles.container}>
          <IconButton icon="pause" size={60} onPress={this.props.pause} />
          <IconButton icon="stop" size={60} onPress={this.props.reset} />
        </View>
        /*
				<View style={styles.container}>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.pause}>
						<Text style={styles.buttonText}>Pause</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.reset}>
						<Text style={styles.buttonText}>Reset</Text>
					</TouchableOpacity>
				</View>
				*/
      );
    } else {
      return (
        <View style={styles.container}>
          <IconButton icon="play" size={60} onPress={this.props.play} />
        </View>
        /*
				<View  style={styles.container}>
					<TouchableOpacity style={styles.buttonStyle} onPress={this.props.play}>
						<Text style={styles.buttonText}>Play</Text>
					</TouchableOpacity>
				</View>
				*/
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#2157DD",
    padding: 30,
    flexDirection: "row",
    borderRadius: 80,
  },
  buttonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "300",
  },
});

export default TimerButtons;
