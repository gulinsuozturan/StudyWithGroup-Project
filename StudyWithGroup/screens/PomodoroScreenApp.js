import React from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import Header from './components/Header'
import PomodoroTimer from './components/PomodoroTimer'


export default class App extends React.Component {
  componentWillUnmount() {
    this.unsubscribe;
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <PomodoroTimer />
      </ScrollView>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});























/*
import TimePicker from './screens/TimePicker';
import DatePicker from './screens/DatePicker';
import YearMonthDayDatePicker from './screens/YearMonthDayDatePicker';
import {toBuddhistYear} from './screens/helpers/dateHelpers';

export {DatePicker, TimePicker, YearMonthDayDatePicker, toBuddhistYear} ;

*/

/*

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import TimerScreen from './Screens/TimerScreen';
//import DatePicker from './Screens/DatePicker';
import TimePicker from './Screens/TimePicker';
import CountDown from './Screens/TimeCountDown';
import Example from './Screens/TimePicker';

export default function App() {
  return (
    
    <View>
      
      <CountDown
        until={60 * 10 + 30}
        size={30}
        onFinish={() => alert('Finished')}
        digitStyle={{backgroundColor: '#0000FF'}}
        digitTxtStyle={{color: '#FFF'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      />
      

    </View>
    
    
    /*
    <View style={styles.container}>
    
    </View>
    */
   /*
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/