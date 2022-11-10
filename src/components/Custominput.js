import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';



 const Custominput = ({ label, value, onChangeText, placeholder, secureTextEntry, cwidth }) => {
  const { inputType, textEnput, containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={inputType}>{label}</Text>
      <TextInput
        width = {cwidth}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={textEnput}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid={'transparent'}
      />
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'center',
  },
  inputType: {
    marginTop: 10,
    marginRight: 5,
  },
  textEnput: {
    borderRadius: 3,
    height: 40,
    borderColor: '#d6d7da',
    marginBottom: 20,
    borderWidth: 0.5,
    padding: 8,
  },
};

export { Custominput };
