import React, { Component } from 'react'
import { StyleSheet, ListView, ActivityIndicator, Text, View, Image, TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux'; // New code
import SegmentedControlTab from "react-native-segmented-control-tab";
import axios from "axios";




export default class ViewAll extends Component {

constructor(props) {
        super(props)
         const ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
         });
  this.state = {
    customStyleIndex: 0, 
    loading: false,
    staffid: "", 
    img1: "", 
    img2: "", 
    img3: "", 
    locationid:"", 
    companyid:"",
    dataSource: ds,
    Daily: [],
    Activity: [],
    Medical: [],
    Expense: [],

          //  Daily: ["DailyOne", "Daily Two", "Daily Three", "Daily Four", "Daily Five", "Daily Six", "Daily Seven", "Daily Eight", "Daily Nine", "Daily Ten", "Daily Eleven", "Daily Twelve"], 
          //  Activity: ["Activity One", "Activity Two", "Activity Three", "Activity Four", "Activity Five", "Activity Six", "Activity Seven", "Activity Eight", "Activity Nine", "Activity Ten", "Activity Eleven", "Activity Twelve"], 
          //  Medical: ["Medical One", "Medical Two", "Medical Three", "Medical Four", "Medical Five", "Medical Six", "Medical Seven", "Medical Eight", "Medical Nine", "Medical Ten", "Medical Eleven", "Medical Twelve"],
          //   Expense: ["Expense One", "Expense Two", "Expense Three", "Expense Four", "Expense Five", "Expense Six", "Expense Seven", "Expense Eight", "Expense Nine", "Expense Ten", "Expense Eleven", "Expense Twelve"], 
            };
    }
componentDidMount() {
  
  var img2 = "";
  var img3 = "";

  if (this.props.data.length == 3) {
    img2 = this.props.data[1]["consumer_image"];
    img3 = this.props.data[2]["consumer_image"]
  } else if (this.props.data.length == 2) {
    
    img2 = this.props.data[1]["consumer_image"];
  }

  console.log(img2);

  if (this.props.data.length>0) {
    this.setState({

      staffid: this.props.data[0]["user_id"],
      locationid: this.props.data[0]["location_id"],
      companyid: this.props.data[0]["company_id"],
      img1: this.props.data[0]["consumer_image"],
      img2: img2,
      img3: img3,
      loading: true
    });

   // debugger;

    var self = this;
    axios
      .post(
        "http://checkdots.com/ils-api/api/v1/viewallconsumer",
        {
          companyid: this.props.data[0]["company_id"],
          locationid: this.props.data[0]["location_id"],
        }
      )
      .then(function (response) {
        if (response.data["status"] == 1) {
          //debugger
          self.setState({
            Daily: response.data["dailylog"],
            Activity: response.data["activitylog"],
            Medical: response.data["medicallog"],
            Expense: response.data["expenselog"],
            dataSource: self.state.dataSource.cloneWithRows(response.data["dailylog"]),
            loading: false
          });
        } else {
          self.setState({
            loading: false
          });
          alert('No data this time');
        }
      })
      .catch(function (error) {
        //alert(error)
        console.log(error);
        self.setState({
          loading: false
        });
      });
  }
  
 
  
  

}
    ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

handleCustomIndexSelect = (index) => {
          this.setState({
              ...this.state,
              customStyleIndex: index,
          });
          if (index == 0) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(
                this.state.Daily
              )
            });
          } else if (index == 1) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(
                this.state.Activity
              )
            });
          } else if (index == 2) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(
                this.state.Medical
              )
            });
          } else if (index == 3) {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(
                this.state.Expense
              )
            });
          }
          
      }

      /////
  
  

renderCellitem = (data) => {
 //debugger;
  return <View style={{ paddingVertical: 5, borderTopWidth: 1, borderColor: "#CED0CE" }}>

        
    {data.map(function (name, index) {
      const { consumer_name, date, entry_text, img_url, staff_comment, staff_name} = name; 
      
      //debugger;
      return <View><View>
        <Text style={styles.consumerName}>
          {consumer_name}
        </Text>
      </View>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Text
            style={styles.dates}
          >
          {date}:
           </Text>
          <Text style={styles.dailyLog }>
          {entry_text}
           </Text>
        </View>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <Text style={styles.dailyLog}>
          {staff_name}:
           </Text>
          <Text style={styles.dateText}>
          {staff_comment}
           </Text>
        </View></View>;
})}
  </View>;};



renderListView = (dataSource) =>{

  //debugger;
  
  return <ListView style={{ paddingLeft: 15 , paddingRight:15 }} dataSource={dataSource} renderSeparator={this.ListViewItemSeparator} renderRow={rowData => this.renderCellitem(rowData)} />;

}


    onPressBack = () => {
      //alert(' OnDelete')
      Actions.pop();

    };

  render() {
    return <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flex: 0, flexDirection: "row" }}>
          <View style={{ flex: 12 }}>
            <View style={{ paddingLeft: 10, paddingTop: 50, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={this.onPressBack} style={styles.triangle}>
                <Image source={require("./components/image/left-arrow.png")} style={{ paddingTop: 10, height: 85, width: 80 }} />
              </TouchableOpacity>

              <Text
              style={styles.viewAll}
            >View All
              </Text>
            </View>
          <ActivityIndicator
            size="large"
            animating={true}
            style={{ opacity: this.state.loading ? 1 : 0 }}
          />
          </View>
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ padding: 2 }}>
            <Image source={{ uri: this.state.img1 }} style={{ height: 102, width: 98, borderColor: "black", borderWidth: 1 }} />
            </View>
            <View style={{ padding: 2 }}>
            <Image source={{ uri: this.state.img2 }} style={{ height: 102, width: 98, borderColor: "black", borderWidth: 1 }} />
            </View>
            <View style={{ padding: 2 }}>
            <Image source={{ uri: this.state.img3 }} style={{ height: 102, width: 98, borderColor: "black", borderWidth: 1 }} />
            </View>
          </View>
        </View>
        <View style={{ flex: 4 }}>
          {/* <View style={{ flex: 0, backgroundColor: "white" }} /> */}
          <View style={{ flex: 0 }}>
            <SegmentedControlTab values={["Daily Log", "Activity Log", "Medical Log", "Expense Log"]} 
            selectedIndex={this.state.customStyleIndex}
             onTabPress={this.handleCustomIndexSelect} 
             borderRadius={0} tabsContainerStyle={{}} 
             tabStyle={{ height: 50, backgroundColor: "#fff", 
             borderColor: "#ccc", borderWidth: 3 }} 
             activeTabStyle={{ backgroundColor: "white", borderBottomColor: "#fff" }} 
             tabTextStyle={{ color: "#444444", fontWeight: "bold", fontSize: 18 }} 
             activeTabTextStyle={{ color: "#888888" }} />
          </View>
          {this.state.customStyleIndex === 0 && this.renderListView(this.state.dataSource)}
          {this.state.customStyleIndex === 1 && this.renderListView(this.state.dataSource)}
          {this.state.customStyleIndex === 2 && this.renderListView(this.state.dataSource)}
          {this.state.customStyleIndex === 3 && this.renderListView(this.state.dataSource)}
        </View>
      </View>;
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10
  },
  tabViewText: {
    color: "#444444",
    fontWeight: "bold",
    marginTop: 50,
    fontSize: 50
  },
  titleText: {
    color: "#444444",
    padding: 20,
    fontSize: 50,
    fontWeight: "500"
  },
  headerText: {
    padding: 8,
    fontSize: 50,
    color: "#444444"
  },
  tabContent: {
    color: "#444444",
    fontSize: 18,
    margin: 24
  },
  Seperator: {
    marginHorizontal: -10,
    alignSelf: "stretch",
    borderTopWidth: 10,
    borderTopColor: "#888888",
    marginTop: 24
  },
  triangle: {
    paddingLeft: 20,
    paddingTop: 10,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",

  },
  viewAll: {
    width: 234,
    height: 43,
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929"

  },
  consumerName: {
    fontFamily: "HelveticaNeue",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929",

  },
  dates: {
    fontFamily: "HelveticaNeue",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929"
  },
  dateText: {
    fontFamily: "HelveticaNeue",
    fontSize: 20,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929",
    marginLeft:3

  },
  dailyLog: {
    fontFamily: "HelveticaNeue",
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929"
    

  }

};