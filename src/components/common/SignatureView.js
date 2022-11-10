import React, {
  Component, PropTypes
} from 'react';

import ReactNative, {
  View, Text, Modal, Platform, Alert
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22
});

const modalViewStyle = {
  paddingTop: toolbarHeight,
  
};

class SignatureView extends Component {

  static propTypes = {
    onSave: PropTypes
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  show(display) {
    this.setState({visible: display});
  }

  render() {
    const {visible} = true;

    return (
      <View >
          <SignatureCapture
          style={{ width: "99.5%", margin: 2, height: 200}}
            onDragEvent={this._onDragEvent.bind(this)}
            onSaveEvent={this._onSaveEvent.bind(this)}
          />
      
      </View>
    );
  }

  _onDragEvent() {
    // This callback will be called when the user enters signature
   console.log("dragged");
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    this.props.onSave && this.props.onSave(result);
  }
}

export default SignatureView;
