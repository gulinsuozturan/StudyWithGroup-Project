import { View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, FlatList, Dimensions, RefreshControl  } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class GruplarScreen extends React.Component {
  state = {
    grupAdi: "",
    list: [],
    refreshing:false,
  };

  async componentDidMount() {await this.listeyiGetir()}

  listeyiGetir = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwt');
    const response = await axios.get(
      APIs.BASE_URL + '/Group/GetAllGroups',
      {
          headers: { 'Authorization': token },
      
      }
    );
     this.setState({list:response.data.data});
     console.log(this.state.list)
  } catch (error) {
    // handle error
    alert(error.message);
  }
}

onRefresh = async () => {
  this.setState({refreshing:true});
  await this.listeyiGetir();
  // wait(2000).then(() => this.setState({refreshing:false}));
  this.setState({refreshing:false})
}

joinGroup = async (param)  => {
  const token = await SecureStore.getItemAsync('jwt');
    console.log('token: ' + token);
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    const data = {
        groupId: param
    };

    console.log("-----");
    console.log(data);
    console.log("-----");

    await axios
          .post(APIs.BASE_URL + '/Group/Join', data, {headers: headers})
          .then(async (res) => {
            console.log('success');
          })
          .catch(e => {
            console.log('message send error ' + e);
          });

          await this.listeyiGetir();
}

renderNoGroup = (route) => {
  return(
    this.props.navigation.navigate(route),
    alert("Katılmış Olduğunuz Gruplar Dışında Bir Grup Bulunamamıştır.")
  );
}

  render() {
    return (
      <SafeAreaView>
        <View>
          { this.state.list.length === 0 ?
            this.renderNoGroup("Gruplarım")
          :
        <FlatList
          data = {this.state.list}
          keyExtractor= {item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <Text style={[styles.listTitle, {fontSize:35}]} >{item.name}</Text>
              <View style={{alignItems:"flex-end", marginTop:40}}>
              <TouchableOpacity
                    style={styles.grubaKatil}
                    onPress={async () => {
                                    await this.joinGroup(item.id);
                                    }}
                >
                <Text style={[styles.listTitle, {fontSize:20}]} >Gruba Katıl {"\n"}</Text>
            </TouchableOpacity>
            </View>
            </View>
          )}
          keyboardShouldPersistTaps="always"
          horizontal={false}
          showsHorizontalScrollIndicator={true}
          style={{height:windowHeight*0.84}}
          refreshControl= {
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      }
      </View> 
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  listContainer: {
      paddingVertical: 32,
      paddingHorizontal: 16,
      width: windowWidth,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
      padding:10,
      height:200,
      
      backgroundColor: "#eaeef7"
  },
  listTitle: {
      fontWeight: "700",
      color: "#000000",
      //marginBottom: 18
      textAlign:"center",
      marginTop:10
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
  grubaKatil:{
    borderRadius:10,
    width:150,
    height:50,
    backgroundColor:"#D1D1D1",
  }
});
