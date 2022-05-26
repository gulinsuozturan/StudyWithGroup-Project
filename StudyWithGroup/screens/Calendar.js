import React  from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Calendar extends React.Component{
    state ={
        email: "",
        displayName: "",
        currentDate:null,
        items: [],
        markedDate:null,
        user:{},
        loading: true,
        selectedDay:[`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
            'DD'
          )}`],
        title:"Bildirim başlığı",
        body:"Bildirim içeriği",

    }
    constructor(props){
        super(props);
        this.state = {currentDate: new Date().getTime()}
        
    let startDate = moment(); // today

    // Create a week's worth of custom date styles and marked dates.
    
    let markedDates = [];
    for (let i=0; i<7; i++) {
      let date = startDate.clone().add(i, 'days');


      let dots = [];
      let lines = [];
      
      markedDates.push({
        date,
        dots,
        lines
      });
    }

    this.state = {
      selectedDate: undefined,
      markedDates,
      startDate,
    };
    }

    async componentDidMount (){
      await this.getDataUsingAsyncAwaitGetCall();
      
    }

     getDataUsingAsyncAwaitGetCall = async () => {
        try {
            const token = await SecureStore.getItemAsync('jwt');
          const response = await axios.get(
            APIs.BASE_URL + '/Event/Get',
            {
                headers: { 'Authorization': token },
                params: { date: moment(this.state.selectedDay).format('YYYY-MM-DDTHH:mm') }
            }
          );
           this.setState({items:response.data.data});

        } catch (error) {
          // handle error
          alert(error.message);
        }
      };
    
    renderItem(item,route) {
        return (
            <SafeAreaView>
            <View style={[styles.item, {height: 50}]}><Text>{item.data.event.title}</Text></View>
            <View style={styles.plusIcon}>
                <IconButton icon="plus" size={60} onPress={() =>
                    this.props.navigation.navigate(route
                        , {
                            currentDate: this.state.currentDate,
                        }
                    )
                    }/>
            </View>
            </SafeAreaView>
        );
    }
    
    renderEmptyDate(route) {
        return (
            <SafeAreaView>
            <View style={styles.plusIcon}>
                <IconButton icon="plus" size={60} onPress={() =>
                    this.props.navigation.navigate(route,
                    {
                        currentDate: this.state.currentDate,
                    }
                    )
                } />
            </View>
            </SafeAreaView>
        );
    }
    renderEmptyData(route){
        return(   
            <View style={styles.plusIcon}>
            {console.log("hayirlisi----------")}

                <IconButton icon="plus" size={60} onPress={() =>
                    this.props.navigation.navigate(route,
                    {
                        currentDate: this.state.currentDate,
            
                    }
                    )
                } />
            </View>
            );
    }
    
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    onDateSelected = async (selectedDate) => {
        this.setState({ selectedDay: selectedDate });
        this.setState({ formattedDate: selectedDate.format('YYYY-MM-DD')});
        await this.getDataUsingAsyncAwaitGetCall();
      }
      

    render(){
        return(
                <SafeAreaView style={{backgroundColor:"#eaeef7", height:windowHeight}}>
                    <CalendarStrip scrollable
                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#9265DC'}}
                        style={{height:100, paddingTop: 10, paddingBottom: 10}}
                        calendarHeaderStyle={{color: 'white'}}
                        calendarColor={'#8CC0DE'}
                        dateNumberStyle={{color: 'white'}}
                        dateNameStyle={{color: 'white'}}
                        iconContainer={{flex: 0.1}}
                        highlightDateNameStyle={{color: 'white'}}
                        highlightDateNumberStyle={{color: '#646FD4'}}
                        highlightDateContainerStyle={{backgroundColor: '#FCFFE7'}}
                        markedDates={this.state.markedDates}
                        selectedDate={this.state.selectedDate}
                        onDateSelected={this.onDateSelected}
                        useIsoWeekday={false}
                />
                <View style={styles.plusIcon}>
                    <IconButton icon="plus" size={60} onPress={() =>
                        this.props.navigation.navigate('Etkinlik',
                        {
                            currentDate: this.state.currentDate,
                        }
                    )
                    } />
                </View>
                
                
                    <FlatList
                        data={this.state.items}
                        renderItem={({ item }) =>
                            <View style={{borderRadius:10, backgroundColor:item.event.color,
                                        margin:10, marginLeft:20, alignItems:'center', width:windowWidth*0.9,height:70}}> 
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("HADİ BAŞLAYALIM!")}>
                                    <Text style={styles.item}>{item.event.title}</Text> 
                                </TouchableOpacity>
                                
                            </View>} 
                    />
                </SafeAreaView>

               

                
        );
    }
}
const styles = StyleSheet.create({
    plusIcon:{
        alignItems:'flex-end',
        justifyContent:'flex-end',
    },
    item:{
        alignItems:'center',
        justifyContent:'center',
        fontSize:25,
        padding:10
        
    },
    textViewContainer: {
        textAlignVertical:'center', 
        fontSize: 15,
        color: '#1c1c1c',
        } 
});

