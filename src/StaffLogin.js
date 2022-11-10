import React, { Component } from "react";
import {
  StyleSheet, ActivityIndicator, Text, View, TextInput, Keyboard, TouchableOpacity,
} from "react-native";
import { Actions } from "react-native-router-flux"; // New code
import axios from "axios";


function validate(passcode) {
  var message = "";

  if (passcode.length === 0) {
    message = "You must enter passcode";
    return message;
  }
  if (passcode.length < 4) {
    message = "passcode should be at least 4 charcters long";
    return message;
  }
  return message;
}


export default class StaffLogin extends Component {
  state = { passcode: " ", loading: false, clockindate:""};
  componentWillMount() {
    Keyboard.dismiss();

  }
onPressButton() {
  
     var message = validate(this.state.passcode);
     if (message.length > 0) {
       alert(message);
       
       return;
     } else {
       
       console.log(this.props["companyid"]);
      console.log(this.props["userId"]);
       console.log(this.props["loctionId"]);
      console.log(this.state.passcode);

      //debugger;


       this.setState({
         loading: true
       });
              
              Keyboard.dismiss();
              var self = this
                //debugger;

              axios
                .post(
                  "http://checkdots.com/ils-api/api/v1/stafflogin",
                  {
                    companyid: this.props["companyid"],
                    userid: this.props["userId"],
                    passcode: this.state.passcode,
                    locationid: this.props["loctionId"]
                  }
                )
                .then(function(response) {
                 
                 //debugger;
                  if (response.data["status"] == 1) {
                   /// alert("got sasussfull data first Api");
                    // 

                    var date = response.data["clock_in_date"];
                    //debugger;
                    self.setState({
                      clockindate: date,
                      loading: false
                    });
                   // console.log(self.state.clockindate);

                    //self.onSucessCallApi();
                    //debugger;

                    Actions.push("goToMainScreen", response.data);
                  }
                  else{
                    self.setState({
                      loading: false
                    });
                    alert(response.data["message"]);
                  }
                })
                  .catch(function(error) {
                    console.log(error);
                    self.setState({
                      loading: false
                    });
                    //debugger;
                  });
            }
   }
  
  //  onSucessCallApi(){
    
  //     var self = this;
  //    axios
  //      .post("http://checkdots.com/ils-api/api/v1/consumers", {
  //        companyid: this.props["companyid"],
  //        locationid: this.props["loctionId"]
         
  //      })
  //      .then(function(response) {
  //        if (response.data["status"] == 1) {
  //         //alert("got sasussfull data");
  //           var userData = response.data["data"];
           
           
  //          console.log(userData);
  //          self.setState({
  //            loading: false
  //          });
  //          debugger;
  //          //alert("get second data  Api");
  //          //Actions.locations({ userData: userData });
  //          Actions.push("goToMainScreen", userData);
  //        }else{
  //          alert(response.data["message"]);
  //          debugger;
  //        }
  //      })
  //      .catch(function(error) {
  //        console.log(error);
  //        alert("error   !!!!");
  //        self.setState({
  //          loading: false
  //        });
  //        debugger;
  //      });

  // }

  
  onPressReset() {
    this.setState({
      loading: true
    });
    Actions.popTo("home");
    // axios
    //   .post("http://checkdots.com/ils-api/api/v1/staffreset", {
    //     staffid: this.props["staffid"],
    //   })
    //   .then(function (response) {
    //     if (response.data["status"] == 1) {
    //       //alert("got sasussfull data");
          
    //       debugger;
    //       //alert("get second data  Api");
    //       //Actions.locations({ userData: userData });
    //       Actions.popTo("home");
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert("error   !!!!");
    //     self.setState({
    //       loading: false
    //     });
    //   });


  }
  //http://checkdots.com/ils-api/api/v1/staffreset

  


// componentDidMount() {
//  // debugger;
// console.log(this.props["companyid"]);
// console.log(this.props["email"]);
// console.log(this.props["userId"]);
// console.log(this.props["loctionId"]);

// };

  render() {
    return <View style={styles.container}>
      <View style={{ flexDirection:'row'}}>
        <View style={{ width:'90%'  }}>
          <View style={styles.errormessagebox}>

          </View>
        </View>
        <View style={{ width: '10%'  }} >
          <Text style={styles.errormessagebox}  onPress={() => this.onPressReset()}
         
        >
          Reset
        </Text>
      </View>
      
      </View>
        <View style={styles.subcontaner}>
       
        
        <ActivityIndicator
          size="large"
          animating={true}
          style={{ opacity: this.state.loading ? 1 : 0 }}
        />
          {/* <TextInput underlineColorAndroid={"transparent"} style={styles.textEnput} width={"25%"} secureTextEntry={false} placeholder="Passcode" 
          value={this.state.passcode} keyboardType='phone-pad' onChangeText={passcode => this.setState(
                { passcode }
              )} /> */}

        <Text  style={styles.textEnput} width={"25%"} >
          {this.state.passcode}
          </Text>
          

        <View style={styles.keyboardbg}>
            {/* <Button style={styles.btnEnter} onPress={() => this.onPressButton()} title="ENTER" /> */}
          {/* <Text style={styles.buttontext} onPress={() => this.onPressButton()}>
              ENTERjustifyContent: 'space-between','space-evenly',around
            </Text> */}
          <View style={styles.keyboardbgInternalView} >
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 1 })}>
            <Text style={styles.keyboardbgText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 2 })}>
            <Text style={styles.keyboardbgText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 3 })}>
            <Text style={styles.keyboardbgText}>3</Text>
            </TouchableOpacity>
            </View>
          <View style={styles.keyboardbgInternalView} >
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 4 })}>
              <Text style={styles.keyboardbgText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 5 })}>
              <Text style={styles.keyboardbgText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 6 })}>
              <Text style={styles.keyboardbgText}>6</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyboardbgInternalView} >
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 7 })}>
              <Text style={styles.keyboardbgText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 8 })}>
              <Text style={styles.keyboardbgText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 9 })}>
              <Text style={styles.keyboardbgText}>9</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.keyboardbgInternalView} >
            <TouchableOpacity onPress={() => this.setState({ passcode: "" })}>
              <Text style={{
                width: 123,
                height: 43,
                fontFamily: "HelveticaNeue",
                fontSize: 40,
                fontWeight: "bold",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#81827f"
              }}>Clear</Text>
            </TouchableOpacity>
         
            <TouchableOpacity onPress={() => this.setState({ passcode: this.state.passcode + 0 })}>
              <Text style={styles.keyboardbgText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressButton()}>
              
          <Text style={{
            width: 122,
            height: 43,
            fontFamily: "HelveticaNeue",
            fontSize: 40,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#417505"
          }}>Enter</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
   
  },
  subcontaner: {
    
    justifyContent: "center",
    alignItems: "center",
    //display: 'flex',
    //backgroundColor: 'red',
    justifyContent: "flex-start"

    //marginTop: -100,
  },

  reset:{
   
    width: 188,
    height: 21,
    fontFamily: "HelveticaNeue",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929"
  },
  
  errormessagebox : {
    // justifyContent: "center",
    // alignItems: "center",
    // width: 922,
    // height: 120,
    // backgroundColor: "#eceff0",
    // shadowColor: "#ffffffcc",
    // shadowOffset: {
    //   width: 0,
    //   height: 0.5
    // },
    // shadowRadius: 0,
    // shadowOpacity: 1
    backgroundColor:'white'
  },
  
  textEnput: {
    // borderRadius: 3,
    // height: 40,
    // borderColor: '#d6d7da',
    // marginBottom: 20,
    // borderWidth: 0.5,
     padding: 20,
    width: 515,
    height: 96,
    backgroundColor: "#eceff0",
    shadowColor: "#ffffffcc",
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#090909",
  },
  
  keyboardbg:{
    width: 515,
    height: 371,
    marginTop: 20,
    backgroundColor: "#eceff0",
    shadowColor: "#ffffffcc",
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    justifyContent: 'space-around'
  },

  keyboardbgText:{
    width: 30,
    height: 45, color: "#37474f", 
    // fontSize: 36,
    // fontWeight: "bold",
    // fontStyle: "normal",
    shadowColor: "#ffffffcc",
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    fontFamily: "HelveticaNeue",
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#090909"
  },
  keyboardbgInternalView:{
    flexDirection: 'row', justifyContent: 'space-around'
  },
  
});

