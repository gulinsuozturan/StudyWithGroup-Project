import { View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, FlatList, Dimensions, RefreshControl } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Card, ListItem, Icon } from 'react-native-elements'
import { GiftedChat } from "react-native-gifted-chat";
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';

import { IconButton } from "react-native-paper";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class GruplarDetayScreen extends React.Component {
  state = {
    grupAdi: "",
    list: [],
    isUsers: false,
    messages: [],
    message: "", 
    refreshing:false,
  };

  async componentDidMount() {
    await this.listeyiGetir();
    await this.mesajListesiniGetir();
  }

  onRefresh = async () => {
    this.setState({refreshing:true});
    await this.mesajListesiniGetir();
    // wait(2000).then(() => this.setState({refreshing:false}));
    this.setState({refreshing:false})
  }

  listeyiGetir = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwt');
    const response = await axios.get(
      APIs.BASE_URL + '/Group/GetDetails',
      {
          headers: { 'Authorization': token },
          params: { groupId: this.props.route.params?.groupId }
      }
    );
     this.setState({list:response.data.data[0]});
     this.setState({grupAdi:response.data.data.name});

     console.log("-----");
     console.log(response.data.data[0]);
     console.log("-----");

  } catch (error) {
    // handle error
    alert(error.message);
  }
}

  componentWillUnmount() {
    
}

mesajListesiniGetir = async () => {
  try {
    const token = await SecureStore.getItemAsync('jwt');
    const response = await axios.get(
      APIs.BASE_URL + '/Message/Get',
      {
          headers: { 'Authorization': token },
          params: { groupId: this.props.route.params?.groupId }
      }
    );
    this.setState({messages:response.data});
    //  this.setState({grupAdi:response.data.data.name});

    console.log("-----");
    console.log(response.data);
    console.log("-----");

  } catch (error) {
    // handle error
    alert(error.message);
  }
}

renderGroup = () =>{
  return(
    <View >
      <Card containerStyle={styles.group} >
        <Card.Title style={{fontSize:25}}>{this.state.list.name}</Card.Title> 
      </Card>
    </View>
  );
}

renderUserList = ()  =>{
  return( 
  <SafeAreaView>
    <FlatList
      data = {this.state.list.users}
      keyExtractor= {item => item.id.toString()}
      renderItem={({item}) => (
          <View style = {styles.listContainer}>
            <Text style={styles.listTitle} numberOfLines={1}>{item.email}</Text>
          </View>
      )}
      keyboardShouldPersistTaps="always"
      horizontal={false}
      showsHorizontalScrollIndicator={true}
      style={{height:windowHeight*0.84}}
    />
  </SafeAreaView>
  );

}

  sendMessages = async ()  => {
  const token = await SecureStore.getItemAsync('jwt');
    console.log('token: ' + token);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    const data = {
      content: this.state.message,
      groupId: this.props.route.params?.groupId
    }

    console.log("-----");
    console.log(data);
    console.log("-----");

    await axios
          .post(APIs.BASE_URL + '/Message/Send', data, {headers: headers})
          .then(async (res) => {
            console.log('success');
          })
          .catch(e => {
            console.log('message send error ' + e);
          });
    
    await this.mesajListesiniGetir();
}

renderMessageList = () => {
  return(
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} enabled>
      <FlatList
      data = {this.state.messages.data}
      keyExtractor= {item => item.id.toString()}
      renderItem={({item}) => (
          <View style={{ justifyContent:'space-between', flexDirection:'row' }}>
            <Text style={[styles.listTitle,{color:"#A0BCC2"}]} multiline={true}>{item.user.email + ': ' + item.content}</Text>
          </View>
      )}
      keyboardShouldPersistTaps="always"
      horizontal={false}
      showsHorizontalScrollIndicator={true}
      style={{height:windowHeight*0.80}}
      refreshControl= {
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />
      }
    />
     <View style = {styles.sendButton} >
        <IconButton style={{marginTop:32}} size={40} icon="send-circle"  onPress={() => this.sendMessages()}/>
      </View>
      <View style = {{ width:windowWidth*0.88, height:40 ,backgroundColor:"#354259", borderRadius: 20, marginBottom:10, marginLeft:5 }}>
      <TextInput style = {{width:windowWidth, height:20,flex:2, fontSize:15, marginLeft:10, marginBottom:10}} 
      placeholderTextColor= "#A0BCC2" placeholder="Mesajınızı yazınız." onChangeText={(text) => this.setState({message:text})}></TextInput>
      </View>
    
    </KeyboardAvoidingView>
  );
}

  render() {
    return (
      <><View >
        <Text >{this.renderGroup()}</Text>
      </View><SafeAreaView style={{ marginTop: 70,flex:1,flexDirection:"column",
                                    justifyContent:"flex-start", alignItems:"flex-start",
                                    backgroundColor:"#205375", borderRadius:10}}>
        <View style = {{ flexDirection:"row"}}>
            <View style={styles.usersButton}>
              <TouchableOpacity onPress={() => this.setState({ isUsers: true })}><Text style={{ color:"#A0BCC2", fontSize: windowWidth * 0.08, }}>Üyeler</Text></TouchableOpacity>
            </View>
          <View style={styles.messagesButton}>
            <TouchableOpacity onPress={() => this.setState({ isUsers: false })}><Text style={{ color:"#A0BCC2", fontSize: windowWidth * 0.08, }}>Mesajlar</Text></TouchableOpacity>
          </View>
        </View>
          <View style={{ flex:1,flexDirection:"row", marginTop:5}}>
              { this.state.isUsers ?
                this.renderUserList() :
                this.renderMessageList()
              }
            </View>
        </SafeAreaView>
        
          
        </>
      
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginLeft:30,
    borderRadius:10,
    borderWidth:2,
    alignItems:"center",
    width:windowWidth*0.8,
    height:70,
    margin:10,
  },
  listTitle: {
      fontSize: 20,
      fontWeight: "700",
      //color: "#000000",
      padding:10,
  },
  count: {
      fontSize: 24,
      fontWeight: "200",
      color: "#000000",
  },
  subtitle: {
      fontSize: 12,
      fontWeight: "700",
      color: "#000000",
  },
  messages:{
  },
  messagesButton: {
    marginLeft:130,
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  usersButton: {
    marginLeft:30,
  },
  group:{
    alignItems: "center",
    width: windowWidth*0.9,
    paddingVertical: 60,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    padding:10,
    backgroundColor:"#eaeef7"

  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
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
  },
  sendButton:{
    marginLeft:360,
    width:50,
    height:50,
    marginBottom:-30,
    justifyContent:"center",
    alignItems:"center",
  },
  
});
