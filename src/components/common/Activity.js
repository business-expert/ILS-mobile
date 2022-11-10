import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet } from 'react-native';


const Activity = ({ status }) => {
    const { container, activityIndicator} = styles;
    return (
    <View style={container}>
            <ActivityIndicator animating={status}
    style={activityIndicator} size='large'/>
        </View>
    );
};
const styles = StyleSheet.create({
container: {
justifyContent: 'center',
alignItems: 'center',
marginTop: 5,
},
activityIndicator: {
justifyContent: 'center',
alignItems: 'center',
height: 80,
},
});
export { Activity };
