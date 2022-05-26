import React from "react";
import { Platform, StyleSheet, Text, View, TextInput } from "react-native";
import Timer from "./Timer";

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workTime: 25,
      breakTime: 5,
      intervalType: "Working",
    };
  }

  componentWillUnmount() {
    this.unsubscribe;
  }

  // handles completion of timer
  handleTimerCompleted = () => {
    if (this.state.intervalType === "Working") {
      this.setState({
        intervalType: "Break",
      });
    } else {
      this.setState({
        intervalType: "Working",
      });
    }
  };

  // gets triggered on change of worktimer text
  handleWorkTime = (
    text //Girilen worktime bilgisine göre(text) sayacı günceller
  ) => {
    if (text >= 0) {
      this.setState({
        workTime: text,
      });
    } else {
      alert("Time invalid. Setting value to default. Please enter valid time");
      this.setState({
        workTime: 25,
      });
    }
  };

  // gets triggered on change of breaktimer text
  handleBreakTime = (text) => {
    //girilen breaktime bilgisine göre(text) sayacı günceller
    if (text >= 0) {
      this.setState({
        breakTime: text,
      });
    } else {
      alert("Time invalid. Setting value to default. Please enter valid time");
      this.setState({
        breakTime: 5,
      });
    }
  };

  // called to set the timer's time
  handleTime = () => {
    if (this.state.intervalType === "Working") {
      return this.state.workTime;
    } else {
      return this.state.breakTime;
    }
  };

  render() {
    let time = this.handleTime();
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <Text style={styles.textStyle}>Odaklanma Süresi{"\t\t\t\t\t\t\t\t\t"}Mola Süresi</Text>
            <View style={styles.minutes}> 
              <TextInput
                style={styles.textStyleYazi}
                keyboardType={"numeric"}
                defaultValue={"" + this.state.workTime}
                onChangeText={this.handleWorkTime}
              />
              <TextInput
                style={styles.textStyleYazi}
                keyboardType={"numeric"}
                defaultValue={"" + this.state.breakTime}
                onChangeText={this.handleBreakTime}
              />
            </View>
          </View>
        </View>
        <Timer
          intervalType={this.state.intervalType}
          Oncomplete={this.handleTimerCompleted}
          period={time}
        />
      </View>
    );
  }
}
export default PomodoroTimer;

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: "column",
    
  },
  row: {
    flex: 1,
    flexDirection: "column",
  },
  inputWrap: {
    flex: 2,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    
  },
  textStyle: {
    fontSize: 18,
    //fontWeight: "200",
    letterSpacing: 1.5,
    fontFamily: Platform.OS == "android" ? "notoserif" : "system",
    marginTop: 40,
    padding: 20,
  },
  textStyleYazi: {
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: 1.5,
    fontFamily: Platform.OS == "android" ? "notoserif" : "system",
    marginTop: 5,
    padding: 20,
    textAlign: "center",
    flex:2,
    flexDirection:"row",
  },
  minutes:{
    flex:2,
    flexDirection:"row",
  },
});
