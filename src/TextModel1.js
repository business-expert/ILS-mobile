import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Actions, Scene} from 'react-native-router-flux';

export default class TextModel1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            title: "Daily Log Entry",
            text: 'Useless Placeholder',
            isSign: true,

        };

    }

    
     
    // componentDidMount() {
    //     var data = this.props.data
    //     debugger;
    //     if (data === 0) { this.setState({ title: "Daily Log" })}
    //     else if (data === 1) { this.setState({ title: "Activity Log" }) }
    //     else if (data === 2) { this.setState({ title: "Medical Log" }) }
    //     else if (data === 3) { this.setState({ title: "Expense Log" }) }
    //     debugger;
    // };

    onCickback = () => {
        if (this.state.isSign){
            this.setState({ isSign: false });
        }else{
            this.setState({ isSign: true });
        }
    };

    render() {
        return (
            <View  >
                <ScrollView style={{ margin:50}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10, justifyContent: 'center'}}>{this.state.title}</Text>
                    </View>
                    <View style={{ backgroundColor: 'red', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={this.onCickback.bind(this)}>
                        <Text>
                            SIGN
                </Text>
                    </TouchableOpacity>
                </View>
                <View >
                        <TextInput
                            multiline={true}
                            style={[{ height: 100, borderColor: 'gray', borderWidth: 1 }]}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />

                </View>
                    <View >
                        <TextInput 
                            multiline={true}
                            style={[this.state.isSign ? {
                                overflow: 'hidden', top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                position: 'absolute', } : { backgroundColor: "green" }]}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />

                    </View>

                    <TouchableOpacity >
                        <Text>
                            Save
                </Text>
                    </TouchableOpacity>



                {/* <TouchableOpacity onPress={this.onCickback.bind(this)}>
                    <Text>
                        Back
                </Text>
                </TouchableOpacity> */}
                </ScrollView>
            </View>
        )
    }
}


