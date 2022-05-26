import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
// import { AuthProvider } from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import * as APIs from '../utils/api'
import axios from 'axios';


export default class RegisterScreen extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  // register = React.useContext(AuthContext);

  // static contextType = AuthProvider;
  // const value = useContext(MyContext);

  handleSignUp = () => {
    // auth
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((userCredentials) => {
    //     const user = userCredentials.user;
    //     console.log("Kaydedilen kullanıcı: ", user.email);
    //     this.props.navigation.replace("Register");
    //   })
    //   .catch((error) => alert(error.message));

    axios
          .post(APIs.BASE_URL + '/User/Register', {
            email: this.state.email,
            password: this.state.password,
          })
          .then(res => {
            this.props.navigation.replace("Login");

            // await SecureStore.setItemAsync('jwt','Bareer ' + res.data.Token);
            // const token = await SecureStore.getItemAsync('jwt');
            // console.log(token); // output: sahdkfjaskdflas$%^&
          })
          .catch(e => {
            console.log('register error ' + e);
          });
  };

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
          <Text style={styles.text1}>{"\n"}Üye Ol</Text>
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
                onPress={() => this.handleSignUp()}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>ÜYE OL</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

        <View
          style={{ height: "10%", width: "100%", backgroundColor: "white" }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
            <Text style={styles.styleAlt}>
              Zaten hesabınız var mı? Giriş yapın.
            </Text>
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

  text1: {
    color: "black",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "left",
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
    backgroundColor: "#2157DD",
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
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
