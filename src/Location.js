import React, { Component } from "react";
import { StyleSheet, Keyboard, ActivityIndicator,Text, View, Picker, Button } from "react-native";
import { Actions } from "react-native-router-flux"; 
import axios from "axios";

export default class Location extends Component {
  state = { language: "", index: 0, dataArray: [], loading:true };

  componentWillMount() {
    Keyboard.dismiss();

  }
                
  onPressLocation = () => {
                   var svalue = this.state.dataArray[this.state.index];
                   var params = { companyid: svalue["company_id"], name: this.props.userData["name"], email: this.props.userData["email"], userId: svalue["user_id"], loctionId: svalue["id"], location: svalue["location"], currentLocation: svalue["current_location"], locationImage: "location_image" };
                    //console.log(params);
                   //debugger;
                   // console.log(svalue);
                   //debugger;
                    //Actions.staffLogin({userData: params});
                    Actions.push("goToStaff", params);
                 };
                 componentDidMount() {
                   
                   var self = this;
                   axios
                     .post(
                       "http://checkdots.com/ils-api/api/v1/locations",
                       {
                         companyid: this.props.userData[
                           "companyid"
                         ]
                       }
                     )
                     .then(function(response) {
                       if (response.data["status"] == 1) {
                         //alert("got sasussfull data");
                         self.setState({
                           dataArray: response.data["data"],
                           loading:false
                         });
                       }else{
                         self.setState({
                           loading: false
                         });
                         alert(response.data["message"])

                       }
                     })
                     .catch(function(error) {
                       console.log(error);
                       self.setState({
                         loading: false
                       });
                     });
                 }

                 render() {
                   return <View style={styles.container}>
                       <View style={styles.subcontaner}>
                         <Text style={styles.header}>
                           Select the location where this
                           unit is located
                         </Text>
                       <ActivityIndicator
                         size="large"
                         animating={true}
                         style={{ opacity: this.state.loading ? 1 : 0 }}
                       />

                       <View style={styles.pickerView} >
                         <Picker style={{
                           fontFamily: "HelveticaNeue",
                           fontSize: 36,
                           fontWeight: "bold",
                           fontStyle: "normal",
                           letterSpacing: 0,
                           textAlign: "left",}}  
                           
                         selectedValue={this.state.language} 
                         onValueChange={(itemValue, indexOf) => this.setState(
                                 {
                                   language: itemValue,
                                   index: indexOf
                                 }
                               )}>
                             {this.state.dataArray.map(
                               (i, index) => (
                                 <Picker.Item
                                   key={index}
                                   label={i.current_location}
                                   value={i.id}
                                   
                                 />
                               )
                             )}
                           </Picker>
                         </View>

                       <View style={styles.btnEnter}>
                         <Text style={styles.btnText} onPress={this.onPressLocation}>
                             ENTER
                           </Text>
                         </View>
                       </View>
                     </View>
                 }
               }   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
  },
  subcontaner: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    //backgroundColor: 'red',
    justifyContent: "flex-start"

    //marginTop: -100,
  },
  header: {
    alignItems: "center",
      width: 770,
      height: 43,
      fontFamily: "HelveticaNeue",
      fontSize: 36,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: 0,
      textAlign: "left",
      color: "#090909"
      
   
  },
  btnEnter: {

    width: 292,
    height: 106,
    borderRadius: 5,
    backgroundColor: "#21bf1a",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#21bf1a",

    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 10,
    paddingTop: 10,
    
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: 15
  },

  btnText:{
    fontFamily: "HelveticaNeue",
    fontSize: 48,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff"
  },
  
  pickerView: {
    //backgroundColor: 'red',
    // width: 500,
    // //height:200,
    // borderColor: "black",
    // borderWidth: 1,
    justifyContent: "center",
    margin: 20,

    
    width: 739,
    height: 87,
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#979797",

  },
  
  pickerItem: {
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#090909"
  }
});             