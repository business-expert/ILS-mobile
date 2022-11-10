import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  PixelRatio,
  ListView

} from "react-native";
import { Actions } from "react-native-router-flux"; // New code
import SegmentedControlTab from "react-native-segmented-control-tab";
import ImagePicker from 'react-native-image-picker';
import axios from "axios";




export default class Consumer extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      avatarSource: null,
      logtype:1,
      isNotAbout: true,
      logname:"Daily",
      customStyleIndex: 0, 
      consumerid:"",
      companyid: "",
      staffid: "", 
      locationid:"",
      userid:"",
      img1: "", 
      consumerName:"",
      aboutme:"",
      allergy:"",
      diagnosis:"",
      emergency_medical:"",
      dataSource: ds,
      Consumer: [],
      Daily: [],
      Activity: [],
      Medical: [],
      Expense: [],
    };

  }

  componentWillReceiveProps(){
    
   // debugger;
    this.callApiToGetData();
  }
  async componentDidMount() {
    //console.log(this.props.custData)
    //debugger;
    this.callApiToGetData();
                
  }

  callApiToGetData(){

    this.setState({
      logtype: 1,
      logname: "Daily",
      staffid: this.props.propData["staff_id"],
      companyid: this.props.custData["company_id"],
      locationid: this.props.custData["location_id"],
      userid: this.props.custData["user_id"],
      consumerid: this.props.custData["consumer_id"],
      img1: this.props.custData["consumer_image"],
      consumerName: this.props.custData["first_name"] + '  ' + this.props.custData["last_name"],

    });




    //console.log(this.props.custData["location_id"])
    //console.log(this.props.custData["company_id"])

    //debugger;






    var self = this;
    axios
      .post(
        "http://checkdots.com/ils-api/api/v1/getconsumer",
        {
          locationid: this.props.custData["location_id"],
          consumerid: this.props.custData["consumer_id"],
        }
      )
      .then(function (response) {
        //debugger;
        if (response.data["status"] == 1) {
          console.log(response.data["consumer"][0]["allergies"]);
         // debugger;


          var consumer = response.data["consumer"];
          var activitylog = response.data["activitylog"];
          var dailylog = response.data["dailylog"];
          var expenselog = response.data["expenselog"];
          var medicallog = response.data["medicallog"];
          //debugger;
          self.setState({
            Consumer: consumer,
            Daily: dailylog,
            Activity: activitylog,
            Medical: medicallog,
            Expense: expenselog,
            aboutme: response.data["consumer"][0]["about_me"],
            allergy: response.data["consumer"][0]["allergies"],
            diagnosis: response.data["consumer"][0]["diagnosis"],
            emergency_medical: response.data["consumer"][0]["emergency_medical"],
            dataSource: self.state.dataSource.cloneWithRows(dailylog)
          });


        }

      })
      .catch(function (error) {
        console.log(error);
        //debugger;

      });

  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  onPressLogEntry = () => {
    //alert(this.props.imgname);
  
    var data = {
      selectIndex: this.state.customStyleIndex,

      imageData: this.state.avatarSource,
      companyid: this.state.companyid,
      consumerid: this.state.consumerid,
      logtype : this.state.logtype,
      locationid: this.state.locationid,
      staffid: this.state.staffid,
      userid: this.state.userid,
      selectTitle: this.state.logname
    };

   // console.log(data);
    //debugger;
    Actions.push("goToTextModel", data );
  

  };


  onPressBack = () => {
    //alert(this.props.imgname);

    Actions.pop();

  };
  //daily log =1
  //activity log = 2
  //medical log = 3
  //expense log = 4

  handleCustomIndexSelect = (index) => {
    this.setState({
      ...this.state,
      customStyleIndex: index,
    });

    if (index == 0) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.Daily

        ),
        logtype: 1,
        logname: "Daily",
        isNotAbout:true,
      });
    } else if (index == 1) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.Activity
        ),
        logtype: 2,
        logname: "Activity",
        isNotAbout: true,
      });
    } else if (index == 2) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.Medical
        ),
        logtype: 3,
        logname: "Medical",
        isNotAbout: true,
      });
    } else if (index == 3) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
          this.state.Expense
        ),
        logtype: 4,
        logname: "Expense",
        isNotAbout: true,
      });
    } else if (index == 4) {
      this.setState({
        isNotAbout: false,
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

  renderCellitem = (data) => {
    //debugger;
    return <View style={{flexDirection:'row',paddingTop:5 ,paddingBottom:5, borderTopWidth: 1, borderColor: "#CED0CE" }}>
      
      <View style={{ width: '90%', flexDirection: 'row'} }>
        <Text
          style={{ 
            justifyContent: "flex-start",
            fontFamily: "HelveticaNeue",
            fontSize: 24,
            fontWeight: "500",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: "#2b2929"
          }}
        >
          Log text:
        </Text>
        <Text
          style={{
            paddingLeft:5,
            fontFamily: "HelveticaNeue",
            fontSize: 20,
            fontWeight: "normal",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#2b2929",
            alignContent:'center'

          }}
        >
          {data["entry_text"]}
        </Text>
      </View>
      <View style={{ width: '10%', alignItems:'center' }}>
        <Image style={{ height: 30, width: 30, margin: 10 }}
          source={{ uri: data["img_url"] }}/>
      </View>

    </View>;
  };

  renderListView = (dataSource) => {
//debugger;
    return <ListView style={{ paddingLeft: 15, paddingRight: 15 }} dataSource={dataSource} renderSeparator={this.ListViewItemSeparator} renderRow={rowData => this.renderCellitem(rowData)} />;

  }



  render() {
    return <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <View style={{ flex: 10, backgroundColor: "white" }}>
          <View style={{  backgroundColor: "white" }}>
            <View style={{ paddingLeft: 10, flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.onPressBack()} style={styles.triangle}>
                <Image source={require("./components/image/left-arrow.png")} style={{ paddingTop: 10, height: 60, width: 60 }} />
              </TouchableOpacity>

              <Text
                style={styles.consumerName}
              >
                {this.state.consumerName }
                </Text>
            </View>
          </View>

          <View style={{  backgroundColor: "white", paddingLeft: 150, paddingBottom:10  }}>
            <View style={{ flexDirection: "row", padding: 2 }}>
              <Text
                style={{
                 
                  paddingRight: 10,
                  fontFamily: "HelveticaNeue",
                  fontSize: 20,
                  fontWeight: "500",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "center",
                  color: "#f40505"

                }}
              >
                Allergies:
                </Text>
              <Text style={{
                fontFamily: "HelveticaNeue",
                fontSize: 20,
                fontWeight: "normal",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "left",
                color: "#f40505", paddingRight: 10 }}>
                {this.state.allergy}
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 2 }}>
              <Text style={{
                paddingRight: 10, fontFamily: "HelveticaNeue",
                fontSize: 20,
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#2b2929" }}>
                Diagnosis:
                </Text>
              <Text style={{
                paddingRight: 10, fontFamily: "HelveticaNeue",
                fontSize: 20,
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#2b2929" }}>
                {this.state.diagnosis}
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 2 }}>
              <Text style={{
                paddingRight: 10, fontFamily: "HelveticaNeue",
                fontSize: 20,
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#2b2929"  }}>
                Emergency Medical:
                </Text>
              <Text style={{
                paddingRight: 10, fontFamily: "HelveticaNeue",
                fontSize: 20,
                fontWeight: "500",
                fontStyle: "normal",
                letterSpacing: 0,
                textAlign: "center",
                color: "#2b2929"}}>
                {this.state.emergency_medical}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 2, }}>
          <View style={{ padding: 2 }}>
            <Image source={{ uri: this.state.img1 }} style={{ height: 150, width: 140, borderColor: "black", borderWidth: 1 }} />
          </View>
        </View>
      </View>
      <View style={{ flex: 4, marginTop:10 }}>
        <View style={{ flex: 0, }}>
          <SegmentedControlTab values={["Daily Log", "Activity Log", "Medical Log", "Expense Log", "About Me"]} selectedIndex={this.state.customStyleIndex} onTabPress={this.handleCustomIndexSelect} borderRadius={0} tabsContainerStyle={{}} tabStyle={{ height: 50, backgroundColor: "#fff", borderColor: "#ccc", borderWidth: 3 }} activeTabStyle={{ backgroundColor: "white", borderBottomColor: "#fff" }} tabTextStyle={{ color: "#2B2929", fontWeight: "bold", fontSize: 18 }} activeTabTextStyle={{ color: "#888888" }} />
        </View>

        {this.state.isNotAbout == false && <Text style={{
          padding: 10, fontFamily: "HelveticaNeue",
          fontSize: 20,
          fontWeight: "normal",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "left",
          color: "#2b2929",
          alignContent: 'center' }} >{this.state.aboutme} </Text>}

        

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ width: 150, marginLeft: 10, marginTop: 15, marginBottom: 15, opacity: this.state.isNotAbout ? 1 : 0}}>
            <Text style={styles.logentry}>Log Entry</Text>
          </View>
          
          
          
          <View style={{ flex: 10, opacity: this.state.isNotAbout ? 1 : 0 }}>
          
            <TouchableOpacity  onPress={this.onPressLogEntry.bind(this)}>
              <TextInput underlineColorAndroid={'transparent'} editable={false}   style={{ borderColor: "#ccc", borderWidth: 1, borderRadius: 5, marginTop: 30 }}  />
            </TouchableOpacity>
          </View>
          <View style={{ width: 100, marginLeft: 15, marginTop: 20, marginBottom: 15, opacity: this.state.isNotAbout ? 1 : 0 }}>
            <TouchableOpacity  onPress={this.selectPhotoTapped.bind(this)}>
              
                {this.state.avatarSource === null ? <Image source={require("./components/image/camera.png")} />  :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
             
            </TouchableOpacity>


          </View>
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
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 75,
    height: 75,
  },
  triangle: {
    paddingLeft: 20,
    paddingTop: 10,
    width: 80,
    height: 80,
    backgroundColor: "#ffffff",

  },
  consumerName:{
    fontFamily: "HelveticaNeue",
    fontSize: 36,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929",
    paddingLeft:20
  },
  logentry:{
    fontFamily: "HelveticaNeue",
    fontSize: 24,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#2b2929",
   paddingTop:10
  },
  

};