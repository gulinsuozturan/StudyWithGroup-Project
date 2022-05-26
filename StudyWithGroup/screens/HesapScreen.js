import { View, Text, StyleSheet, KeyboardAvoidingView, SafeAreaView, FlatList, Dimensions  } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HesapScreen extends React.Component {

  state = {
    ad: "",
  };

  async componentDidMount() {
    await this.kullaniciyiGetir();
  }

  kullaniciyiGetir = async () => {
    try {
      const token = await SecureStore.getItemAsync('jwt');
    const response = await axios.get(
      APIs.BASE_URL + '/User/Get',
      {
          headers: { 'Authorization': token },
      }
    );
     this.setState({ad:response.data.data.email});


  } catch (error) {
    // handle error
    alert(error.message);
  }
}

  cikisIslemi = async () => {
    await SecureStore.setItemAsync('jwt', '');
    this.props.navigation.navigate("Loading");
};

  render() {
    return (
      <SafeAreaView style={{backgroundColor:"#eaeef7"}}>
        <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={{marginTop:200, fontSize:50}}>{"Güle Güle " + this.state.ad + " :)"}</Text>
           <View style={{ flexDirection: 'row', marginTop: 100 }}>
               <TouchableOpacity
                   style={styles.button}
                   onPress={
                     async () => await this.cikisIslemi()}
               >
                   <Text style={{ fontSize: 20 }}>Çıkış Yap</Text>
               </TouchableOpacity>
           </View>
        </View>
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        fontSize: 14,
        height: 40,
        width: 250,
        borderRadius: 20,
        paddingLeft: 20,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 8,
        borderRadius: 20,
        paddingLeft: 20,
        marginTop:200,
        width:200
    },
  });
