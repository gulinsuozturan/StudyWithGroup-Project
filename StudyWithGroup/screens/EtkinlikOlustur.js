import React, {Fragment} from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Switch,
Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { v4 as uuidv4 } from 'uuid';
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions';

import { IconButton } from "react-native-paper";

const { width: vw } = Dimensions.get('window');

export default class EtkinlikOlustur extends React.Component
{
  state ={
    isDateTimePickerVisible: null,
    selectedTask: null,
    currentDay:null,
    eventText:'',
    notesText:'',
    isAlarmSetted:null,
    startTime:new Date(),
    alarmTime:new Date(),
    createNewCalendar:null,
    updateCurrentTask:null,
    currentDate:null,
    selectedDay:null,
    selected:null,
    selectedColor:'',

  }
  constructor(props){
    super(props);
    this.state = 
    {
      isDateTimePickerVisible:false,
      currentDay:moment().format(),
      isAlarmSetted:false,
      alarmTime:moment().format(),
      startTime:moment().format(),
      currentDate: this.props.route.params?.currentDate ?? (() => null),
      selectedDay:[`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
        'DD'
      )}`],
      
      selected: true,
      selectedColor: '#2E66E7',
      
      notesText:"",
      
    }
}

  handleAlarmSet = () => {
    let prevAlarm = this.state.isAlarmSetted;
    this.setState({isAlarmSetted:!prevAlarm});
    this.showDateTimePicker();
  };
  showDateTimePicker = () => this.setState({isDateTimePickerVisible:true});

  hideDateTimePicker = () => this.setState({isDateTimePickerVisible:false});

  handleDatePicked = (date,time) => {
    const selectedDatePicked = this.state.currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    if(this.state.isAlarmSetted)
      time =  "alarmTime";
    else
      time = "startTime";
    
    if(time == "startTime")
    {
      const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
      console.log('------');
      console.log(newModifiedDay);
      console.log('------');
      this.setState({startTime: newModifiedDay,alarmTime: newModifiedDay}); 
      this.hideDateTimePicker(); 
    }
    if(time == "alarmTime")
    {
      const newModifiedDay_alarm = moment(selectedDatePicked).hour(hour).minute(minute);
      console.log('------');
      console.log(newModifiedDay);
      console.log('------');
      this.setState({alarmTime: newModifiedDay_alarm}); 
      this.hideDateTimePicker();
    }
  };

  addList = etkinlikler => {
    this.addListFire({
      title: this.state.eventText,
      description: this.state.notesText,
      startDate: moment(this.state.startTime).format('YYYY-MM-DDTHH:mm'),
      alarmDate: moment(this.state.alarmTime).format('YYYY-MM-DDTHH:mm'),
      isOn: this.state.isAlarmSetted,
      color: `rgb(${Math.floor(
        Math.random() * Math.floor(256)
      )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
        Math.random() * Math.floor(256)
      )})`
    });


  };

  scheduleNotification = async () => {
console.log('this.state.currentDate');
console.log(this.state.currentDate);
console.log('this.state.currentDate');

    await Notifications.scheduleNotificationAsync({
        content:{
            title:this.state.eventText,
            body:"Etkinlik başlamak üzere!",
        },
        trigger:{
            date: moment(this.state.alarmTime).format('YYYY-MM-DDTHH:mm'),
        },
      });
  };

  addListFire = async (etkinlikler) => {
    console.log(etkinlikler);

    const token = await SecureStore.getItemAsync('jwt');
    console.log('token: ' + token);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }
    await axios
          .post(APIs.BASE_URL + '/Event/Create', etkinlikler, {headers: headers})
          .then(async (res) => {
            console.log('success');
          })
          .catch(e => {
            console.log('event create error ' + e);
          });
          
          Notifications.scheduleNotificationAsync({
            content:{
                title:etkinlikler.name,
                body:"Etkinlik başlamak üzere!",
            },
            trigger:{
                date: this.state.startTime,
            },
          });

          if(this.state.isAlarmSetted){
            console.log('--notification--');
            this.scheduleNotification();
          }

}

  handleCreateEventData = async () => {
    this.addList();
    this.props.navigation.navigate('Etkinliklerim');
    //await updateTodo(creatTodo);
    this.setState({updateCurrentTask:this.state.currentDate});
  };

  render (){
    return(
      <Fragment>
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked}
        onCancel={this.hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />

      <SafeAreaView style={styles.container}>
        <View
          style={{
            height: Dimensions.get('window').height
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 100
            }}
          >
            <View style={styles.backButton}>
              
              <IconButton icon="arrow-left" style={{ marginRight: vw / 2 - 120, marginLeft: 20, height: 25, width: 40 }}
               onPress={() => this.props.navigation.navigate('Etkinliklerim')}/>
            

              <Text style={styles.newTask}>Yeni Etkinlik</Text>
            </View>
            <View style={styles.calenderContainer}>
              <CalendarList
                style={{
                  width: 350,
                  height: 350
                }}
                current={this.state.currentDay}
                minDate={moment().format()}
                horizontal
                pastScrollRange={0}
                pagingEnabled
                calendarWidth={350}
                onDayPress={(day) => {
                  this.setState({selectedDay:
                    {
                      [day.dateString]:
                      {
                        selected: true,
                        selectedColor: '#2E66E7',
                      }
                    },
                    currentDay: day.dateString,
                    alarmTime: day.dateString,           
                    startTime: day.dateString
                  });
                }}
                monthFormat="yyyy MMMM"
                hideArrows
                markingType="custom"
                theme={{
                  selectedDayBackgroundColor: '#2E66E7',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#2E66E7',
                  backgroundColor: '#eaeef7',
                  calendarBackground: '#eaeef7',
                  textDisabledColor: '#d9dbe0'
                }}
                markedDates={this.state.selectedDay}
              />
            </View>
            <View style={styles.taskContainer}>
              <TextInput
                style={styles.title}
                onChangeText={(text) => {
                      this.setState({eventText:text});
              }}
                value={this.state.eventText}
                placeholder="Etkinlik Adı"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: '#BDC6D8',
                  marginVertical: 10
                }}
              >
                Öneriler
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.readBook}>
                  <TouchableOpacity onPress= {()=>this.setState({eventText:"Kitap Okuma"})}>
                    <Text  style={{ textAlign: 'center', fontSize: 14 }} >
                      Kitap Okuma
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.design}>
                <TouchableOpacity onPress= {()=>this.setState({eventText:"Tasarım"})}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    Tasarım
                  </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.learn}>
                <TouchableOpacity onPress= {()=>this.setState({eventText:"Ders Çalışma"})}>
                  <Text style={{ textAlign: 'center', fontSize: 14 }}>
                    Ders Çalışma
                  </Text>
                </TouchableOpacity>
                </View>
              </View>
              <View style={styles.notesContent} />
              <View>
                <Text style={styles.notes}>NOT</Text>
                <TextInput
                  style={{
                    height: 25,
                    fontSize: 19,
                    marginTop: 3
                  }}
                  onChangeText={(text) => {
                    this.setState({notesText:text});
            }}
                  value={this.state.notesText}
                  placeholder="Etkinlik İle İlgili Bir Not Girin."
                />
              </View>
              <View style={styles.separator} />
              <View>
                <Text
                  style={{
                    color: '#9CAAC4',
                    fontSize: 16,
                    fontWeight: '600'
                  }}
                >
                  Başlama Zamanı
                </Text>
                <TouchableOpacity
                  onPress={() => this.showDateTimePicker()}
                  style={{
                    height: 25,
                    marginTop: 3
                  }}
                >
                  <Text style={{ fontSize: 19 }}>
                    {moment(this.state.startTime).format('h:mm A')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View>
                  <Text
                    style={{
                      color: '#9CAAC4',
                      fontSize: 16,
                      fontWeight: '600'
                    }}
                  >
                    Alarm
                  </Text>
                  <TouchableOpacity
                  onPress={() => this.state.isAlarmSetted ? this.showDateTimePicker(): ''}
                  style={{
                    height: 25,
                    marginTop: 3
                  }}
                  >
                    <Text style={{ fontSize: 19 }}>
                      {moment(this.state.alarmTime).format('h:mm A')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Switch value={this.state.isAlarmSetted} onValueChange={this.handleAlarmSet} />
              </View>
            </View>
            <TouchableOpacity
              disabled={this.state.eventText === ''}
              style={[
                styles.createTaskButton,
                {
                  backgroundColor:
                  this.state.eventText === '' ? 'rgba(46, 102, 231,0.5)' : '#2E66E7'
                }
              ]}
              onPress={async () => {
                  this.handleCreateEventData();
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  textAlign: 'center',
                  color: '#fff'
                }}
              >
                Etkinlik Oluştur
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 5,
    justifyContent: 'center'
  },
  separator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600'
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20
  },
  learn: {
    height: 23,
    width: 90,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  readBook: {
    height: 23,
    width: 85,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19
  },
  taskContainer: {
    height: 400,
    width: 327,
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#2E66E7',
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22
  },
  calenderContainer: {
    marginTop: 30,
    width: 350,
    height: 350,
    alignSelf: 'center'
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center'
  },
  backButton: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eaeef7'
  }
});