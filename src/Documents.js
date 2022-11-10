import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Linking
} from "react-native";
import { Actions } from 'react-native-router-flux'; // New code
import axios from "axios";

export default class Documents extends Component {

 constructor(props) {
        super(props)
          this.state = { 
           
            FolderName: [],
            dataSource: [],
            allData:[],
            loading:false,
            selectIndex:0
           };

    }

  componentDidMount() {

    if (this.props.data.length > 0) {
      this.setState({
        loading: true
    });


      //alert(this.props.data[0]["company_id"]+" "+this.props.data[0]["location_id"])



    debugger;
    var self = this;
      axios
        .post(
          "http://checkdots.com/ils-api/api/v1/getDocuments",
          {
            company_id: this.props.data[0]["company_id"],
            location_id: this.props.data[0]["location_id"],
          }
        )
      .then(function (response) {

        console.log(response.data)
        debugger;
        if (response.data["status"] == 1) {
         // alert("got sasussfull data");
          debugger;
          var lvalues = "";
          if (response.data["data"]["folder"].length>0){
            var name = response.data["data"]["folder"][0];
            lvalues = response.data["data"][name];

          }
          debugger;

          self.setState({
            FolderName: response.data["data"]["folder"],
            dataSource: lvalues,
            allData: response.data["data"],
            loading:false,
          });
          
        } else {
          self.setState({
            loading: false
          });
          alert('No data this time');
        }
        
      })
      .catch(function (error) {
        console.log(error);
        //alert(error)
        self.setState({
          loading: false,
        });
        debugger;
      });
    }

  };


  btnClick = (index) => {
   
    var fname = this.state.FolderName[index]
    var daraArray = this.state.allData[fname];
    this.setState({
          ...this.state,
          dataSource: daraArray,
        selectIndex: index
        });
    

}




  GetGridViewItem (item) {
  
    //Alert.alert(item);
    
   // Actions.push("goToPdfViewer", item);
    Linking.openURL(item);
 
  };

  



  render() {
    

    onPressBack = () => {
      alert("back");

     // Actions.pop();
    };
    return <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flexDirection: "column" }}>
          <View style={{ height: "20%", width: "100%" }}>
            <View style={{ padding: 10,  flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => {
                  Actions.pop();
                }} style={styles.triangle}>
              <Image source={require("./components/image/left-arrow.png")} style={{ paddingTop: 10, height: 60, width: 60 }} />
              </TouchableOpacity>

            <Text style={styles.documents}>
                DOCUMENTS
              </Text>
            </View>
          <ActivityIndicator
            size="large"
            animating={true}
            style={{ opacity: this.state.loading ? 1 : 0 }}
          />
          </View>
          <View style={{ height: "100%", width: "100%", flexDirection: "row" }}>
            <View style={{ width: "20%", height: "100%", backgroundColor: "white", paddingLeft:10 }}>
              
            
            { this.state.FolderName.map((name,index) => {
             
      return (
       
        <View><TouchableOpacity onPress={this.btnClick.bind(this, index)}>
          <Text
            style={this.state.selectIndex === index ? styles.selected : styles.unselected}
          >
            {name}
                </Text>
        </TouchableOpacity></View>
      )
          })}
           
            </View>
            <View style={{ width: "80%", height: "80%", backgroundColor: "white" }}>
            <FlatList data={this.state.dataSource} renderItem={({ item }) => <View style={styles.GridViewBlockStyle}>
                    <TouchableOpacity onPress={this.GetGridViewItem.bind(this, item.url)}>
                      <View style={{ alignItems: "center", width: 150, paddingBottom: 5 }}>
                        <Image source={require("./components/image/doc.png")} style={{ height: 58, width: 54, paddingBottom: 5 }} />
                        
                        <Text  style={[styles.GridViewInsideTextItemStyle]}>
                        {item.doc}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>} numColumns={4} />
            </View>
          </View>
        </View>
      </View>;
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: 0
  },

  GridViewBlockStyle: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    height: 100,
    margin: 5,
    width: 100,
    backgroundColor: "#fff"
  },
  GridViewInsideTextItemStyle: {
    color: "#000",
    fontSize: 14,
    alignItems: "center",
    paddingTop:5
  },
  documents : {
    width: 289,
    height: 43,
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929"
  },
  triangle: {
    paddingLeft: 20,
    paddingTop: 10,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",

  },
  selected:{
    fontFamily: "HelveticaNeue",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929",
  },
  unselected: {
    fontFamily: "HelveticaNeue",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929",
  },

});