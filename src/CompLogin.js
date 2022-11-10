import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, Dimensions, PixelRatio } from "react-native";
import { Actions } from "react-native-router-flux"; 
import axios from "axios";
const { width, height } = Dimensions.get('window');

export default class CompLogin extends Component {
    state = { email: "isl@isl.com", password: "123456", error: "", loading: false,  };
//this.setState({ fontSize: (text.lenght > 6 ? 40 : 80) });


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
               
                <View style={{ backgroundColor: 'white', flex: 2, alignItems: "flex-end", padding:10 }}>
                    <Text style={styles.username}>Username: </Text>
                 </View>
                <View style={{ flex: 3 ,}}>
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

                <View style={{ backgroundColor: 'white', flex: 2, alignItems: "flex-end", padding: 10 }}>
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
                <Text style={styles.buttontext}  onPress={this.onPressTitle}>
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
         alignItems: "center",
        
    },
    headerContainer: {
         alignItems: "center",
         

    },
    subcontaner: {
        //backgroundColor: "green",
        flexDirection:"row",
        alignItems: "center",
        paddingTop:20
       
    },
    bottomcontaner: {
        //backgroundColor: "green",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 60

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
       
        fontFamily: "HelveticaNeue",
        fontSize: 36,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "left",
        color: "#090909"
    },
    textField:{
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
    button :{
        width: 292,
        height: 106,
        borderRadius: 5,
        backgroundColor: "#21bf1a",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#21bf1a",
         alignItems: "center",
         
    },
    buttontext:{

           
            fontFamily: "HelveticaNeue",
            fontSize: 48,
            fontWeight: "bold",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "left",
            color: "#ffffff",
            paddingTop:18
       
    }
    
});