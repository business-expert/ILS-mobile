import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Keyboard, Image, Alert, ScrollView,TouchableOpacity} from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux"; // New code


export default class MainScreen extends Component {
  state = { staffid: '', dataArray: [], messagesArray: [],current:'',name0:'',name1:'',name2:'',  image0: '' ,image1: '', image2: '', isClockIn:false };
            
  
  componentWillMount(){
    Keyboard.dismiss();
    console.log(this.props.flag);
    if (this.props.flag === 1) {
      //debugger;

      this.setState({
        isClockIn: true,
      });
    } else {
      //debugger;

      this.setState({
        isClockIn: false,
      });
    }

  }

  
                 
  async componentDidMount() {

    var self = this;
    axios
      .post("http://checkdots.com/ils-api/api/v1/consumers", {
        companyid: this.props.data["company_id"],
        locationid: this.props.data["location_id"]

      })

      .then(function (response) {
        if (response.data["status"] == 1) {
          //debugger;
          //alert("got sasussfull data");
          var userData = response.data["data"];


          var image0 = "";
          var image1 = "";
          var image2 = "";
          var name0 = "";
          var name1 = "";
          var name2 = "";

          userData.map((name, index) => {
            if (index === 0) {
              image0 = name["consumer_image"];
              name0 = name["first_name"];

            } else if (index === 1) {
              image1 = name["consumer_image"];
              name1 = name["first_name"];

            } else if (index === 2) {
              image2 = name["consumer_image"];
              name2 = name["first_name"]

            }


            self.setState({
              current: self.props["clock_in_date"],
              dataArray: userData,
              image0: image0,
              image1: image1,
              image2: image2,
              name0: name0,
              name1: name1,
              name2: name2,
              staffid: self.props.data["staff_id"],
            });

          })



        } else {

          Alert.alert(

            // This is Alert Dialog Title
            ' Alert !!',

            // This is Alert Dialog Message. 
            'There are no Consumer this Location . Please Choose another Location',
            [


              // Third OK Button in Alert Dialog
              { text: 'OK', onPress: () => Actions.popTo("locations") }

            ]

          )

        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        //debugger;

      });


    
    //this.getconsumers()
    this.getMessageData()

  }               
  
  onPressimage = (tapindex) => {
    var custData = this.state.dataArray[tapindex];
    //console.log(custData);


    var data = {
      custData: custData,
      propData: this.props.data,
    };

    //alert(url);
    //this.setState({imgname:'img1.png'})
    //alert(this.imgname);
    //console.log(data);
    //debugger;
    Actions.push("goToConsumer", data);

  };   

  getMessageData() {

    console.log(this.props.data["company_id"]);
   console.log(this.props.data["location_id"]);

    //debugger;
    var self = this;
    axios
      .post("http://checkdots.com/ils-api/api/v1/getMessages", {
        companyid: this.props.data["company_id"],
        locationid: this.props.data["location_id"]

      })

      .then(function (response) {
        if (response.data["status"] == 1) {
         
          //("got sasussfull data");
          var userMessageData = response.data["data"];
          //debugger;
          //messagesArray
           self.setState({
             messagesArray: userMessageData,
            });
          //debugger;

          // userMessageData.map((name, index) => {
          //   debugger;

          // })



        } else {

        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        debugger;

      });

  }
  getconsumers(){
    debugger;

      console.log( this.props.data["company_id"]);
      console.log(this.props.data["location_id"]);
    debugger;
    var self = this;
    axios
      .post("http://checkdots.com/ils-api/api/v1/consumers", {
        companyid: this.props.data["company_id"],
        locationid: this.props.data["location_id"]

      })

      .then(function (response) {
        if (response.data["status"] == 1) {
          debugger;
          //alert("got sasussfull data");
          var userData = response.data["data"];


          var image0 = "";
          var image1 = "";
          var image2 = "";
          var name0 = "";
          var name1 = "";
          var name2 = "";

          userData.map((name, index) => {
            if (index === 0) {
              image0 = name["consumer_image"];
              name0 = name["first_name"];

            } else if (index === 1) {
              image1 = name["consumer_image"];
              name1 = name["first_name"];

            } else if (index === 2) {
              image2 = name["consumer_image"];
              name2 = name["first_name"]

            }


            self.setState({
              current: self.props["clock_in_date"],
              dataArray: userData,
              image0: image0,
              image1: image1,
              image2: image2,
              name0: name0,
              name1: name1,
              name2: name2,
              staffid: self.props.data["staff_id"],
            });

          })



        } else {

          Alert.alert(

            // This is Alert Dialog Title
            ' Alert !!',

            // This is Alert Dialog Message. 
            'There are no Consumer this Location . Please Choose another Location',
            [


              // Third OK Button in Alert Dialog
              { text: 'OK', onPress: () => Actions.popTo("locations") }

            ]

          )

        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        debugger;

      });

  }


  onCickClockIn = () => {
    
    console.log(this.props.data)
    debugger;
    var self = this;
    axios
      .post(
        "http://checkdots.com/ils-api/api/v1/staffclockin",
        {
          staffid: this.props.data["staff_id"],
          userid: this.props.data["user_id"], 
          locationid: this.props.data["location_id"],
          companyid: this.props.data["company_id"],
          
        }
      )
      .then(function (response) {
        if (response.data["status"] == 1) {
          //alert("got sasussfull data");
          console.log(response.data);
          debugger;
          var date = `${response.data["data"]["start_date"]} ${response.data["data"]["start_time"]}`
          console.log(date);
          //debugger;
          self.setState({
            isClockIn: true,
            current: date

          });
        }
      })
      .catch(function (error) {
        console.log(error);
        debugger;
      });                  
  };               
                 

  onCickClockOut = () => {
    Alert.alert(

      // This is Alert Dialog Title
      'ClockOut Alert !!',

      // This is Alert Dialog Message. 
      'Are you sure you want to Clock Out',
      [

        // Second Cancel Button in Alert Dialog.
        { text: 'Cancel', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel' },

        // Third OK Button in Alert Dialog
        { text: 'OK', onPress: () => this.nowCickClockOut() },

      ]

    )


  };              

  nowCickClockOut = () => {

        var date = new Date().getDate();
                   var month = new Date().getMonth() + 1;
                   var year = new Date().getFullYear();
                  var houre = new Date().getHours();
                  var minuts = new Date().getMinutes();
                  var seconds = new Date().getSeconds();

               var date = year + "-" + month + "-" + date ;
               var time =  houre + ":" + minuts + ":" + seconds;
    var self = this;


    axios
      .post(
        "http://checkdots.com/ils-api/api/v1/staffclockout",
        {
          staffid: this.props.data["staff_id"],
          enddate: date,
          endtime: time,
        }
      )
      .then(function (response) {
        if (response.data["status"] == 1) {
          //alert("CickClockOut sasussfull ");
          self.setState({
            isClockIn: false,

          });
          Actions.pop();
          //debugger;
        }else{
          alert("ClockOut Unsasussfull please try Again ");
        }
      })
      .catch(function (error) {
        console.log(error);
        debugger;
        alert(error);
      });            
  };

                

  render() {
    return <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop:25, paddingLeft:100,paddingRight:100,paddingBottom:20 }}>
        <View style={{ backgroundColor: "white" }}>
          <TouchableOpacity disabled={this.state.isClockIn}
            style={[this.state.isClockIn ? styles.btnClockDeactive : styles.btnClockActive]}
            onPress={() => {this.onCickClockIn()}}>
            <Text style={[this.state.isClockIn ? styles.textClockDeactive : styles.textClockActive]} >
              CLOCK IN</Text>
          </TouchableOpacity>
          <Text style={styles.texttime}>
            {this.state.current}
          </Text>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <TouchableOpacity disabled={!this.state.isClockIn}
            style={[this.state.isClockIn ? styles.btnClockActive : styles.btnClockDeactive]}
            onPress={() => { this.onCickClockOut() }}>
            <Text style={[this.state.isClockIn ? styles.textClockActive : styles.textClockDeactive]}>
              CLOCK OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
     
      <View style={{ flexDirection: "column", justifyContent: "space-between",  alignItems: "stretch" }}>
        <View style={{  flexDirection: "row", justifyContent: "center", backgroundColor: "white" }}>
          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.onPressimage(0)}>
              <Image source={{ uri: this.state.image0 }} style={{ height: 200, width: 200, borderColor: "black", borderWidth: 1 } //source={{ uri: this.state.dataArray[0]["consumer_image"] } //source={require("./image/img1.png")}
              } />
              <Text
                style={styles.custName}
              >
                {this.state.name0}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.onPressimage(1)}>
              <Image source={{ uri: this.state.image1 }} style={{ height: 200, width: 200, borderColor: "black", borderWidth: 1 } //source={{ uri: this.state.dataArray[1]["consumer_image"] } //source={require("./image/img1.png")}
              } />
              <Text
                style={styles.custName}
              >
                {this.state.name1}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => this.onPressimage(2)}>
              <Image source={{ uri: this.state.image2 }} style={{ height: 200, width: 200, borderColor: "black", borderWidth: 1 } //source={{ uri: this.state.dataArray[2]["consumer_image"] } //source={require("./image/img1.png")}
              } />
              <Text
                style={styles.custName}
              >
                {this.state.name2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "space-around", }}

        >
          <TouchableOpacity onPress={() => { Actions.push("goToLast24Hrs", { data: this.state.dataArray }) }}
            style={styles.btnAll}>
            <Text style={styles.textButtonAll}>Last 24 Hr</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.push("goToViewAll", { data: this.state.dataArray }) }}
            style={styles.btnAll}>
            <Text style={styles.textButtonAll}>View All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Actions.push("goToDocuments", { data: this.state.dataArray }) }}
            style={styles.btnAll}>
            <Text style={styles.textButtonAll}>Documents</Text>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{ paddingLeft: 100, paddingBottom: 100, paddingTop: 10, height:321, backgroundColor: "white", }}>
        <Text style={styles.houseMessage}>House Messages :</Text>
        <ScrollView>
          {

            this.state.messagesArray.map((name, index) => {

              console.log(name["message"], name.message);
              //debugger;
              return <Text style={styles.texthouseMessage} >{name["message"]}</Text>;

            })}
        </ScrollView>
      </View>

       
     </View>;
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
   // alignItems: "center",

  },
  btnClockDeactive: {
      width: 241,
      height: 71,
      borderRadius: 5,
      backgroundColor: "#dadbda",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#dadbda",
     
      
  },
  textClockDeactive: {
   
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ada9a9",
    paddingTop: 10
  },
  btnClockActive: {
    width: 241,
    height: 71,
    borderRadius: 5,
    backgroundColor: "#da0c1c",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#da0c1c",
   
    
  },
  textClockActive: {
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff",
    paddingTop:10
  },
  texttime: {
  fontFamily: "HelveticaNeue",
  fontSize: 18,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: "#2b2929"
},
custName:{
  fontFamily: "HelveticaNeue",
  fontSize: 24,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: "#2b2929",
  padding: 10
},
btnAll:{
  width: 241,
  height: 71,
  borderRadius: 5,
  backgroundColor: "#50e3c2",
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#50e3c2"

},
textButtonAll:{
  fontFamily: "HelveticaNeue",
  fontSize: 36,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: "#504e4e",
  paddingTop:5
},
houseMessage:{
    width: 290,
    height: 40,
    fontFamily: "HelveticaNeue",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#504e4e",
   
  },
  texthouseMessage: {
    fontFamily: "HelveticaNeue",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#f40505",
    paddingLeft:20,
   
  }


});