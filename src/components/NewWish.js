'use strict';

import React from 'react';
import {
  Text, View, TextInput, Picker,
  ImageBackground, Modal, Alert,
} from 'react-native';

import Button from 'apsl-react-native-button';

import Store from '../store/Store';
import ActionType from '../common/ActionType';
import Events from '../common/Events';
import ErrorType from '../common/ErrorType';
import {BG_PICS} from '../common/Constants';
import Actions from '../actions/Actions';
import {checkRequestError} from '../common/Util';

import styles from '../styles/NewWish';

class NewWish extends React.Component {
  constructor(props) {
    super(props);

    const wishForUpdate = Store.getMyWishForUpdate();
    if (wishForUpdate === undefined) {
      this.state = {
        wish: '', fontFamily: 'Helvetica', fontSize: 16,
        fontColor: 'black', backgroundPic: 'pic1', id: null
      };
    }
    else {
      this.state = {
        wish: wishForUpdate.wish, fontFamily: wishForUpdate.fontFamily,
        fontSize: wishForUpdate.fontSize, fontColor: wishForUpdate.fontColor,
        backgroundPic: wishForUpdate.backgroundPic, id: wishForUpdate.id
      };
    }

    this.submit = this.submit.bind(this);
    this.onSaved = this.onSaved.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener({
      'type': Events.MYWISH_SAVED_EVENT,
      'callback': this.onSaved
    });
    Store.addChangeListener({
      'type': Events.CONFIRM_CANCEL_EVENT,
      'callback': this.goBack
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      'type': Events.MYWISH_SAVED_EVENT, 'callback': this.onSaved
    });
    Store.removeChangeListener({
      'type': Events.CONFIRM_CANCEL_EVENT, 'callback': this.goBack
    });
  }

  onSaved() {
    const status = Store.getLastActionInfo();
    if (status.failed == null) {
      this.props.navigation.setParams({isEditing: false});
      Alert.alert(
        'Info',
        'Whooooo :)',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
    else {
      checkRequestError(this);
    }
  }

  goBack() {
    this.props.navigation.setParams({
      isEditing: false,
    });
    this.props.navigation.goBack();
  }

  submit() {
    Actions.submitWish(this.state);
  }

  handleSubmitResponse(status) {
  }

  render() {
    checkRequestError(this);
    
    return (
      <View style={styles.view}>
        <TextInput
           multiline
           maxLength={166}
           onChangeText={(text) => {
             this.setState({
               wish: text,
             });
             this.props.navigation.setParams({
               isEditing: true,
             });
            }
          }
          style={styles.textInput}
          value={this.state.wish}
          />
          <View style={styles.pickersView}>
            <View style={styles.pickerView}>
              <Text style={styles.pickerFontStyle}>Font Style</Text>
              <Picker
                 selectedValue={this.state.fontFamily}
                 itemStyle={styles.pickerItem}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   fontFamily: itemValue,
                })}>
                <Picker.Item label='Helvetica' value='Helvetica' />
                <Picker.Item label='Papyrus' value='Papyrus-Condensed' />
                <Picker.Item label='Savoye' value='SavoyeLetPlain' />
                <Picker.Item label='Snell' value='SnellRoundhand' />
                <Picker.Item label='TimesNewRoman' value='TimesNewRomanPSMT' />
                <Picker.Item label='Copperplate' value='Copperplate' />
                <Picker.Item label='Bradley' value='BradleyHandITCTT-Bold' />
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Text style={styles.pickerFontStyle}>Font Size</Text>
              <Picker
                 selectedValue={this.state.fontSize.toString()}
                 itemStyle={styles.pickerItem}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   fontSize: parseInt(itemValue),
                })}
                >
                <Picker.Item label='12' value='12' />
                <Picker.Item label='14' value='14' />
                <Picker.Item label='16' value='16' />
                <Picker.Item label='18' value='18' />
                <Picker.Item label='20' value='20' />
                <Picker.Item label='22' value='22' />
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Text style={styles.pickerFontStyle}>Font Color</Text>
              <Picker
                 selectedValue={this.state.fontColor}
                 itemStyle={styles.pickerItem}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   fontColor: itemValue,
                })}
                >
                <Picker.Item color='red' label={'Red'} value={'red'} />
                <Picker.Item color='blue' label={'Blue'} value={'blue'} />
                <Picker.Item color='black' label={'Black'} value={'black'} />
              </Picker>
            </View>
            <View style={styles.pickerView}>
              <Text style={styles.pickerFontStyle}>Background</Text>
              <Picker
                 selectedValue={this.state.backgroundPic}
                 itemStyle={styles.pickerItem}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   backgroundPic: itemValue,
                })}
                >
                <Picker.Item label={'Sea'} value={'pic1'} />
                <Picker.Item label={'Sky'} value={'pic2'} />
              </Picker>
            </View>
          </View>
          <View style={styles.imageView}>
            <ImageBackground
               style={styles.imageBackground}
               source={BG_PICS[this.state.backgroundPic]}
               >
              <View style={styles.imageTextStyle}>
                <Text
                   style={{
                     fontFamily: this.state.fontFamily,
                     fontSize: this.state.fontSize,
                     color: this.state.fontColor,
                     textAlign: 'center'
                   }}>
                  {this.state.wish}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.buttonView}>
            <View style={styles.dummyView} />
            <Button style={styles.buttonStyle} textStyle={styles.buttonTextStyle} onPress={this.submit}>
              Publish To The World!
            </Button>
            <View style={styles.dummyView} />
          </View>
      </View>
  	);
  }
}

module.exports = NewWish;
