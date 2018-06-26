'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, TextInput, Picker,
  ImageBackground, Modal, Alert,
} from 'react-native';

import Button from 'apsl-react-native-button';

import Store from '../store/Store';
import ActionType from '../common/ActionType';
import Events from '../common/Events';
import Actions from '../actions/Actions';

const ASSETS_PREFIX = '../../assets/';

class NewWish extends React.Component {
  constructor(props) {
    super(props);

    const wishForUpdate = Store.getMyWishForUpdate();
    if (wishForUpdate === undefined) {
      this.state = {
        wish: '', fontFamily: 'Helvetica', fontSize: 16,
        fontColor: 'black', backgroundPic: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
      };
    }
    else {
      this.state = {
        wish: wishForUpdate.wish, fontFamily: wishForUpdate.fontFamily,
        fontSize: wishForUpdate.fontSize, fontColor: wishForUpdate.fontColor,
        backgroundPic: wishForUpdate.backgroundPic
      };
    }

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener({
      'type': Events.MYWISH_SAVED_EVENT,
      'callback': this.onSaved
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      'type': Events.MYWISH_SAVED_EVENT, 'callback': this.onSaved
    });
  }

  onSaved() {
    if (Store.getSubmitStatus()) {
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
      Alert.alert(
        'Error',
        'Failed to save the wish...',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }
  }

  submit() {
    Actions.submitWish(this.state);
  }

  render() {
    return (
      <View style={{flexDirection: 'column', flex: 1}}>
        <TextInput
           multiline
           onChangeText={(text) => {
             this.setState({
               wish: text,
             });
            }
          }
          style={
            {
              flex: 2,
            }
          }
          value={this.state.wish}
          />
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center'}}>Font Style</Text>
              <Picker
                 selectedValue={this.state.fontFamily}
                 itemStyle={{height: 60, fontSize: 12}}
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
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center'}}>Font Size</Text>
              <Picker
                 selectedValue={this.state.fontSize.toString()}
                 itemStyle={{height: 60, fontSize: 12}}
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
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center'}}>Font Color</Text>
              <Picker
                 selectedValue={this.state.fontColor}
                 itemStyle={{height: 60, fontSize: 12}}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   fontColor: itemValue,
                })}
                >
                <Picker.Item color='red' label={'Red'} value={'red'} />
                <Picker.Item color='black' label={'Black'} value={'black'} />
              </Picker>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'center'}}>Background</Text>
              <Picker
                 selectedValue={this.state.backgroundPic}
                 itemStyle={{height: 60, fontSize: 12}}
                 onValueChange={(itemValue, itemIndex) => this.setState({
                   backgroundPic: itemValue,
                })}
                >
                <Picker.Item label={'Sea'} value={'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'} />
                <Picker.Item label={'Sky'} value={'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'} />
              </Picker>
            </View>
          </View>
          <View style={{flex: 3}}>
            <ImageBackground
               style={{
                 flex: 1,
                 justifyContent: 'center'
               }}
               source={{ uri: this.state.backgroundPic}}
               >
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                   style={{
                     fontFamily: this.state.fontFamily,
                     fontSize: this.state.fontSize,
                     color: this.state.fontColor,
                   }}>
                  {this.state.wish}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{flex: 0.6, padding: 20, flexDirection: 'row'}}>
            <View style={{flex: 0.3}} />
            <Button style={styles.buttonStyle} textStyle={styles.buttonTextStyle} onPress={this.submit}>
              Publish To The World!
            </Button>
            <View style={{flex: 0.3}} />
          </View>
      </View>
  	);
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 22,
    flex: 1,
  },

  buttonTextStyle: {
    fontSize: 12
  },
});

module.exports = NewWish;
