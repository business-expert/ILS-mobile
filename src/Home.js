import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Dimensions, PixelRatio, Keyboard } from "react-native";
import { Actions } from "react-native-router-flux"; 

import { Custominput } from "./components/Custominput";

import axios from "axios";
const { width, height } = Dimensions.get('window');

function validate(email, password) {
  var message = "";
  const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  if (email.length === 0) {
    message = "You must enter an email address";
    return message;
  }
  if (email.length < 5) {
    message = "Email should be at least 5 charcters long";
    return message;
  }
  if (email.split("").filter(x => x === "@").length !== 1) {
    message = "Email should contain a @";
    return message;
  }
  if (email.indexOf(".") === -1) {
    message = "Email should contain at least one dot";
    return message;
  }
  if (!emailValid) {
    message = "Email is not valid";
    return message;
  }
  if (password.length === 0) {
    message = "You must enter a password";
    return message;
  }
  if (password.length < 6) {
    message = "Password should be at least 6 characters long";
    return message;
  }
  return message;
}


export default class Home extends Component {
  state = { email: "demo@demo.com", password: "123456", error: "", loading: false };

 // Keyboard.dismiss();
  componentWillMount() {
    Keyboard.dismiss();

  }



onPressTitle = () => {
  
  const { email, password } = this.state;
  var self = this;
  var message = validate(email, password);
  if (message.length > 0) {
    // this.setState({ error: message });
    alert(message);
    //return;
  } else {
    this.setState({
      loading: true
    });
    axios
      .post(
        "http://checkdots.com/ils-api/api/v1/login",
        {
          email: this.state.email,
          password: this.state.password
        }
      )
      .then(function (response) {
        //debugger;
        if (response.data["status"] == 1) {
          //alert("got sasussfull data");
          var userData = response.data["data"];
          //console.log(userData)
           //debugger;
          self.setState({
            loading: false
          });
          Actions.locations({
            userData: userData
          });
        }else{
          self.setState({
            loading: false
          });
          alert(response.data["message"])
        }
        //  console.log(response.data["message"]);
        //  console.log(response.data["status"]);
        //  console.log(response.status);
        //  console.log(response.data)
        //  console.log(response.headers);
        //  console.log(response.config);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          loading: false
        });
       // debugger;
        
      });
  }                 
};

  render() {
    return <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.loginHeader}>
          Company Login
                         </Text>
        <View style={{ paddingTop: 0 }} >

          <ActivityIndicator
            size="large"
            animating={true}
            style={{ opacity: this.state.loading ? 1 : 0 }}
          />
        </View>

      </View>
      <View style={styles.subcontaner}>

        <View style={{ backgroundColor: 'white', flex: 2, alignItems: "flex-end" }}>
          <Text style={styles.username}>Username: </Text>
        </View>
        <View style={{ flex: 3, }}>
          <TextInput
            style={styles.textField}

            secureTextEntry={false}
            placeholder={"User Email"}
            autoCorrect={false}

            value={this.state.email}
            onChangeText={email => this.setState(
              { email }
            )}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
      <View style={styles.subcontaner}>

        <View style={{ backgroundColor: 'white', flex: 2, alignItems: "flex-end" }}>
          <Text style={styles.username}>Password: </Text>
        </View>
        <View style={{ flex: 3, }}>
          <TextInput
            style={styles.textField}
            secureTextEntry={true}
            placeholder={"Password"}
            autoCorrect={false}

            value={this.state.password}
            onChangeText={password => this.setState(
              { password }
            )}
            underlineColorAndroid={'transparent'}
          />
        </View>
      </View>
      <View style={styles.bottomcontaner}>
        <View style={styles.button}>
          <Text style={styles.buttontext} onPress={this.onPressTitle}>
            ENTER
                           </Text>
        </View >
      </View >

    </View>;
  }
}                

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //alignItems: "center",

  },
  headerContainer: {
    paddingTop: 20,
    alignItems: "center",


  },
  subcontaner: {
    //backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50

  },
  bottomcontaner: {
   // backgroundColor: "green",
    flexDirection: "row",
   
    marginTop: 60,
    justifyContent: 'center',
   // alignItems: 'center',
    paddingLeft:120

  },
  loginHeader: {

    fontFamily: "HelveticaNeue",
    fontSize: 48,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#090909"
  },
  username: {
    paddingRight:40,
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#090909"
  },
  textField: {
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#979797",
    width: 530,
    height: 51,
    fontFamily: "HelveticaNeue",
    fontSize: 28,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#8e8e8f"


  },
  button: {
    width: 292,
    height: 106,
    borderRadius: 5,
    backgroundColor: "#21bf1a",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#21bf1a",
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttontext: {


    fontFamily: "HelveticaNeue",
    fontSize: 48,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
   

  }

});