import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Keyboard,
    
} from 'react-native';
import { Actions, Scene } from 'react-native-router-flux';
import axios from "axios";
//import SignatureCapture from 'react-native-signature-capture';
import SignatureView from './components/common/SignatureView';

export default class TextModel1 extends React.Component {
    constructor(props) {
        super(props)
        //debugger;
        this.state = {
            imageData: this.props.imageData,
            title: this.props.selectIndex,
            text: '',
            textsign: '',
            isSign: false,
            loading: false,
            SignImageData: null,
        };

    }

    onClickCallShow(){
        this.setState({
            isSign: true
        }); 
    }

    onClickCallApiWithoutImage(){
        



        var self = this;
        axios
            .post(
                "http://checkdots.com/ISL/api/v1/consumerentry",
                {
                    companyid: this.props.companyid,
                    logtype: this.props.logtype,
                    consumerid: this.props.consumerid,
                    locationid: this.props.locationid,
                    staffid: this.props.staffid,
                    userid: this.props.userid,
                    log_message: this.state.text,
                    log_signature: this.state.SignImageData,
                    
                }
            )
            .then(function (response) {
                debugger
                if (response.data["status"] == 1) {
                    debugger
                    self.setState({
                        loading: false
                    });

                    self.onPressBack();
                } else {
                    self.setState({
                        loading: false
                    });
                    
                }
            })
            .catch(function (error) {
                //alert(error)
                console.log(error);
                self.setState({
                    loading: false
                });
                debugger;
            });
    }

    // onClickCallApi() {
    //    // console.log(this.state.imageData );
    //     if (this.state.imageData == null) {

    //         if (this.state.SignImageData == null) {

    //             alert("Please Sing Document")
    //          }else{
    //             this.onClickCallApiWithoutImage();
    //         }
           

    //     } else {

    //         this.onClickCallApiWithImage();
    //     }
    //     debugger;
    // }

    onClickCallApi() {
       debugger;
        if (this.state.imageData == null  ) {
            debugger;
            if (this.state.SignImageData == null){
                alert("Please Sing Document")
                debugger;
            }else{
                debugger;
                this.onClickCallApiWithoutImage();

            }
                

        } else {
            debugger;
            this.onClickCallApiWithImage();
           
        }
       
    }


    onClickCallApiWithImage() {
        this.setState({
            loading: true
        });

        //alert(this.state.text, this.state.textsign);
        const data = new FormData();
        //debugger;

        console.log('companyid', this.props.companyid); // works
        console.log('logtype', this.props.logtype); // works
        console.log('consumerid', this.props.consumerid); // works
        console.log('locationid', this.props.locationid); // works
        console.log('staffid', this.props.staffid); // works
        console.log('userid', this.props.userid); // works
        console.log('log_message', this.state.text); // works
        

        debugger;


        data.append('companyid', this.props.companyid); // works
        data.append('logtype', this.props.logtype); // works
        data.append('consumerid', this.props.consumerid); // works
        data.append('locationid', this.props.locationid); // works
        data.append('staffid', this.props.staffid); // works
        data.append('userid', this.props.userid); // works
        data.append('log_message', this.state.text); // works
        data.append('log_signature', this.state.SignImageData);

        data.append('location_img', {
            uri: this.props.imageData.uri,
            type: 'image/x-generic', // or photo.type
            name: 'testPhotoName',
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        fetch("http://checkdots.com/ISL/api/v1/consumerentry", {
            method: 'post',
            body: data
        }).then(res => {
            console.log(res)
            this.setState({
                loading: false
            });
            
            this.onPressBack();

        });
 }

    onPressBack = () => {
        //alert(this.props.imgname);
        //Actions.pop();
        Actions.pop({refresh:true})
       // Actions.pop();
        //popTo: (sceneKey: string, props?: any) => void;
    };

    _onSave(result) {
        debugger
        const base64String = `data:image/png;base64,${result.encoded}`;
        this.setState({ SignImageData: base64String });
       
    }



    render() {

        return (
            <View style={{ flex: 1,  backgroundColor: "white", alignItems:"center" }}>
                
                <View style={{ width: "80%", height: "100%", backgroundColor:"white" }}>
                    <View style={{ justifyContent:"center"}}>
                        <Text style={{ margin: 10, color:'#2B2929', textAlign: "center", fontWeight:"800" , fontSize:22}}>
                            {this.props.selectTitle + " "+"Log Entry"}
                         </Text>
                    </View>
                    
                    <ActivityIndicator
                        size="large"
                        animating={true}
                        style={{ opacity: this.state.loading ? 1 : 0 }}
                    />
                    <View style={{justifyContent: 'flex-end'  , flexDirection:'row' ,marginRight:20, paddingBottom:15 }}>
                        
                        <TouchableOpacity disabled={this.state.isSign}

                            style={[!this.state.isSign ? {
                                height: 40,
                                width:170,
                                backgroundColor: '#21BF1A',
                                //alignSelf: 'stretch',
                                textAlign: "center",
                                justifyContent: 'center',


                            } : {
                                    height: 40,
                                    backgroundColor: '#DADBDA',
                                   // alignSelf: 'stretch',
                                    width: 170,

                                    textAlign: "center",
                                    justifyContent: 'center',
                                    disabled: true,
                                }]}


                            onPress={() => {
                                this.onClickCallShow();

                            }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    justifyContent: 'center', color: 'white', fontWeight: 'bold'
                                }}
                            >
                                Sign
                             </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 

                            style={ {
                                height: 40,
                                width: 170,
                                backgroundColor: '#21BF1A',
                                //alignSelf: 'stretch',
                                textAlign: "center",
                                justifyContent: 'center',
                                marginLeft:10,


                            } }


                            onPress={() => {
                                Keyboard.dismiss(); 

                            }}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    justifyContent: 'center', color: 'white', fontWeight: 'bold'
                                }}
                            >
                                Hide Keyboard
                             </Text>
                        </TouchableOpacity>
                    </View>
                   
                    <View style={{
                        borderLeftWidth: 4,
                        borderRightWidth: 4, borderTopWidth: 4, borderBottomWidth: 4, borderColor:"#979797" , justifyContent: "center" }}>
                        <TextInput
                            underlineColorAndroid={'transparent'}
                            multiline={true}
                            value={this.state.text} onChangeText={text => this.setState(
                                { text }
                            )}
                            style={{ width: "99.5%",margin:2, height:100 }}>
                        </TextInput>
                    </View>
                    <View style={{opacity: this.state.isSign ? 1 : 0}} >
                        <Text
                            style={{ paddingBottom: 10, paddingTop:10, color:'#2B2929', fontWeight: "800", fontSize: 18 }}>
                            Sign you name below to verify that you are the one making the entry.
                         </Text>
                        <View style={{
                            borderLeftWidth: 4,
                            borderRightWidth: 4, borderTopWidth: 4, borderBottomWidth: 4, borderColor: "#979797", justifyContent: "center"
                        }}>
                            
                            <SignatureView
                                saveImageFileInExtStorage={false}
                                showNativeButtons={false}
                                showTitleLabel={false}
                                viewMode={"landscape"}
                                ref={r => this._signatureView = r}
                                rotateClockwise={!!true}
                                onSave={this._onSave.bind(this)}
                            />
                            
                        </View>
                   
                    <View style={{ alignItems: "flex-end", marginRight: 20, paddingTop:10 }}>
                            <TouchableOpacity 

                                style={[this.state.isSign ? {
                                    height: 40,
                                    backgroundColor: '#21BF1A',
                                   // alignSelf: 'stretch',
                                    width: 170,

                                    textAlign: "center",
                                    justifyContent: 'center',


                                } : {
                                        height: 40,
                                        backgroundColor: '#DADBDA',
                                       // alignSelf: 'stretch',
                                        width: 170,

                                        textAlign: "center",
                                        justifyContent: 'center',
                                        disabled: true,
                                    }]}


                                onPress={() => {
                                    this.onClickCallApi();

                                }}>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        justifyContent: 'center', color: 'white', fontWeight: 'bold'
                                    }}
                                >
                                    Save
                             </Text>
                            </TouchableOpacity>
                            
                    </View>
                </View>
                </View>  
            </View>);
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center", 
        height: 50,
       
        backgroundColor: "#eeeeee",
        margin: 10
    }
});