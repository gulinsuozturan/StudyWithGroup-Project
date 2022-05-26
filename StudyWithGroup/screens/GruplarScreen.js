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
      APIs.BASE_URL + '/Group/Get',
      {
          headers: { 'Authorization': token },
      
      }
    );
     this.setState({list:response.data.data});
     console.log(response.data.data.id)

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

  render() {
    return (
      <SafeAreaView>
        <View>
        <FlatList
          data = {this.state.list}
          keyExtractor= {item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
                    style={styles.listContainer}
                    onPress={() => this.props.navigation.navigate('Grup Detay', { groupId: item.id })}
                >
              <View style={{ alignItems: "center", justifyContent:'space-between', flexDirection:'row' }}>
                <Text style={styles.listTitle} numberOfLines={1}>{item.name}</Text>
              </View>
            </TouchableOpacity>
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
      </View> 
      </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  listContainer: {
      paddingVertical: 32,
      paddingHorizontal: 16,
      alignItems: "center",
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
      backgroundColor: "#eaeef7"
  },
  listTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: "#000000",
      //marginBottom: 18
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
  }
});
