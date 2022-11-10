import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ListView, ActivityIndicator, Linking} from "react-native";
import { Actions } from 'react-native-router-flux'; // New code
import axios from "axios";

export default class Last24Hrs extends Component {
  state = { dataArray: [], img1: '', img2: '', img3: '' };
   
constructor(props) {
        super(props)
         const ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
         });
  this.state = {
    dataSource: ds, 
    loading:false,
    locationid: "", 
    companyid: "",
     dataArray: [],
     pdfLink:"",
         };
    }


  componentDidMount() {

     //this.props.propData;
    //const { events, id, name, image } = this.props.navigation.state.params['data'];
    //console.log(this.props.data[0]["consumer_image"]);
   // debugger;
    if (this.props.data.length > 0) {

      var img2 = "";
      var img3 = "";

      if (this.props.data.length === 3){
        img2 = this.props.data[1]["consumer_image"];
        img3 = this.props.data[2]["consumer_image"]
      } else if (this.props.data.length === 2){
        img2 = this.props.data[1]["consumer_image"];
      }
      



    this.setState({
      staffid: this.props.data[0]["user_id"],
      locationid: this.props.data[0]["location_id"],
      companyid: this.props.data[0]["company_id"],
      img1: this.props.data[0]["consumer_image"],
      img2: img2,
      img3: img3,
      
      loading: true,
    });

    

    var self = this;
  axios
    .post(
      "http://checkdots.com/ils-api/api/v1/last24hours",
      {
        companyid: this.props.data[0]["company_id"],
        locationid: this.props.data[0]["location_id"],
      }
    )
    .then(function (response) {
      if (response.data["status"] == 1) {
       // alert("got sasussfull data");
        //console.log(response.data);
       // debugger;
        
        self.setState({
          dataSource: self.state.dataSource.cloneWithRows(response.data["data"]),
          loading: false,
          pdfLink: response.data["download_link"] 
        });
      }else{
        self.setState({
          loading: false
        });
        alert('No data this time');
      }
    })
    .catch(function (error) {
      self.setState({
        loading: false
      });
      
    });

  }

  // this.setState({
  //   dataSource: this.state.dataSource.cloneWithRows(this.state.dataArray)
  // });
  };
    
  onPressBack = () => {
      //alert(' OnDelete')
      //console.log('test');
      Actions.pop();

    };

  onPrintPdf = () => {
    //alert(' OnDelete')
    //console.log('test');
    Linking.openURL(this.state.pdfLink);

  };

 
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

renderCellitem = (data) => {
    return <View >
        <View>
          <Text
            // style={{
            //   justifyContent: "flex-start",
            //   alignContent: "center",
            //   margin: 3, 
            //   fontWeight:'bold', fontSize:18,
            // }}
          style={styles.consumerName}
          >
            {data["name"]} :
          </Text>
        </View>
        <View style={{ flex: 0,  flexDirection: "row" }}>
        <Text style ={ styles.dates }>
            {data["date"]} :
          </Text>
        <Text style={styles.dateText}>{data["comment"]}</Text>
        </View>
        <View style={{ flex: 0,  flexDirection: "row" }}>
          <Text
            style={styles.dailyLog}
          >
            {data["logType"]} : 
          </Text>
        <Text style={styles.dateText}>{data["logvalue"]}</Text>
        </View>
        <View style={{ flex: 0,  flexDirection: "row" }}>
        <Text style={styles.dailyLog}>
            Staff Name :
          </Text>
        <Text style={styles.dateText}>{data["staff"]}</Text>
        </View>
      </View>;
    
  };

renderListView = (dataSource) =>{
  return <ListView style={{ paddingLeft: 15 , paddingRight:15 }} dataSource={dataSource}  renderRow={rowData => this.renderCellitem(rowData)} />;
}




  render() {
    return <View style={{ flex: 1, backgroundColor:"white"  }}>
        <View style={{ flex: 0,  flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.onPressBack()} style={styles.triangle}>
              <Image source={require("./components/image/left-arrow.png")} style={{ height: 64, width: 64 }} />
           
            </TouchableOpacity>
          <Text
            style={{

              width: 319,
              height: 43,
              fontFamily: "HelveticaNeue",
              fontSize: 36,
              fontWeight: "bold",
              fontStyle: "normal",
              letterSpacing: 0,
              textAlign: "center",
              color: "#2b2929"

            }}
          >
            LAST 24 HOURS
            </Text>

          <ActivityIndicator
            size="large"
            animating={true}
            style={{ opacity: this.state.loading ? 1 : 0 }}
          />
          </View>

          <View style={{ flexDirection: "column", justifyContent: "flex-end" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ padding: 10 }}>
              <Image source={{ uri: this.state.img1 }} style={{ height: 102, width: 98, }} />
              </View>
              <View style={{ padding: 10 }}>
              <Image source={{ uri: this.state.img2 }} style={{ height: 102, width: 98, }} />
              </View>

              <View style={{ padding: 10 }}>
              <Image source={{ uri: this.state.img3 }} style={{ height: 102, width: 98, }} />
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.onPrintPdf()} style={{ alignItems: "flex-end", margin: 10, paddingRight: 50 }}>
                <Text
                  style={{
                    paddingRight: 24,
                    paddingLeft: 24,
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderRadius: 5,
                    fontWeight: "bold",
                    color: "#000000",
                    backgroundColor: "#50E3C2",
                    fontSize: 24
                  }}
                >
                  PRINT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.renderListView(this.state.dataSource)} 
      </View>;
  }
}

const styles = StyleSheet.create({
  triangle: {
    paddingLeft:20,
    paddingTop: 10,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",
    
  },
  consumerName : {
    fontFamily: "HelveticaNeue",
    fontSize: 20,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#2b2929",
    
  },
  dates : {
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
  

});

