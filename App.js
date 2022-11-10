/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Router, Scene } from 'react-native-router-flux';
import Home from './src/Home';
import Location from './src/Location';
import StaffLogin from './src/StaffLogin';
import MainScreen from './src/MainScreen';
import Last24Hrs from './src/Last24Hrs';
import ViewAll from './src/ViewAll';
import Documents from './src/Documents';
import Consumer from './src/Consumer';
import PdfViewer from './src/PdfViewer';
import TextModel from './src/TextModel';
import CompLogin from './src/CompLogin';



export default class App extends Component {
  render() {
    return <Router >
        <Scene key="root">
        <Scene key="home" component={Home} title="Home" hideNavBar={true} initial />
          <Scene key="locations" component={Location} title="Location" hideNavBar={true} />
          <Scene key="goToStaff" component={StaffLogin} title="StaffLogin" hideNavBar={true} />
          <Scene key="goToMainScreen" component={MainScreen} title="MainScreen" hideNavBar={true} />
          <Scene key="goToLast24Hrs" component={Last24Hrs} title="Last24Hrs" hideNavBar={true} />
          <Scene key="goToViewAll" component={ViewAll} title="ViewAll" hideNavBar={true} />
         <Scene key="goToDocuments" component={Documents} title="Documents" hideNavBar={true}  />
         <Scene key="goToConsumer" component={Consumer} title="Consumer" hideNavBar={true} />
         <Scene key="goToPdfViewer" schema="modal" component={PdfViewer}  type="transitionToTop" />
        <Scene  key="goToTextModel" hideNavBar={true} schema="modal" component={TextModel} type="transitionToTop" />

         {/* <Scene key="goToTextModel" direction="vertical" title="Modal" schema="modal" component={TextModel} hideNavBar={true} /> */}
        
        </Scene>
      </Router>;
  }
}
