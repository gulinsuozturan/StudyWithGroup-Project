import React from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthContext } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';

export default class LoginScreen extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
    val:this.context,
  };

  
  static contextType = AuthContext;

  handleLogin = async () => {
    const { email, password } = this.state;

    await axios
          .post(APIs.BASE_URL + '/User/Login', {
            email: this.state.email,
            password: this.state.password,
          })
          .then(async (res) => {
            await SecureStore.setItemAsync('jwt','Bearer ' + res.data.data.jwtToken);
            const token = await SecureStore.getItemAsync('jwt');
            console.log(token);
            this.props.navigation.navigate("Loading");
          })
          .catch(e => {
            console.log('register error ' + e);
          });
    

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((error) => this.setState({ errorMessage: error.message }));

    
  };

  componentWillUnmount() {
    this.unsubscribe;
  }


  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column", //row - column yazarak dene
          justifyContent: "flex-start", // center / flex-end / flex-start / space-around / space-between dene
          alignItems: "flex-start", //center / flex-end / flex-start / stretch(bunu denerek kutuların width kaldır.) dene . Yatay hizalama yapıyor.
        }}
      >
        <View
          style={{ height: "20%", width: "100%", backgroundColor: "#bebebe" }}
        >
          <Text style={styles.text1}>{"\n"}Giriş Yap</Text>
        </View>

        <View
          style={{ height: "70%", width: "100%", backgroundColor: "white" }}
        >
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.InputContainer}>
              <Text>{this.state.val}</Text>
              <Text>Kullanıcı Adı</Text>
              <TextInput
                placeholder="Kullanıcı adınız..."
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={styles.input}
              />

              <Text>Şifre</Text>
              <TextInput
                placeholder="Şifreniz..."
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                style={styles.input}
                secureTextEntry
              />
            </View>

            {this.state.errorMessage && (
              <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => this.handleLogin()}
                styles={styles.buttonText}
              >
                <Text style={styles.button}>GİRİŞ YAP</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

        <View
          style={{ height: "10%", width: "100%", backgroundColor: "white", justifyContent:"flex-end", padding:10}}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
            <Text>Hesabın yok mu? ÜYE OL</Text>
          </TouchableOpacity>
        </View>


        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  InputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#2157DD",
    width: "100%",
    padding: 15,
    borderRadius: 0,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#2157DD",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  view1: {},
  text1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "left",
  },
});
