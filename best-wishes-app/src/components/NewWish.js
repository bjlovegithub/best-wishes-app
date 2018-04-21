'use strict';

import React from 'react';
import {
    StyleSheet, Text, View, TextInput, Picker,
    ImageBackground, Modal, Button, Alert,
} from 'react-native';

import Store from '../store/Store';
import ActionType from '../common/ActionType';
import Events from '../common/Events';
import Actions from '../actions/Actions';

const ASSETS_PREFIX = '../../assets/';

// Reference from https://reactnative.fun/2017/06/21/expanding-textinput/
class ExpandingTextInput extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            height: 0
        };
    }

    focus () {
        this.textInput && this.textInput.focus();
    }

    render () {
        return (
            <TextInput
               {...this.props}
               ref={(view) => (this.textInput = view)}
              multiline
              autoFocus={true}
              onContentSizeChange={(event) => {
                  if (event && event.nativeEvent && event.nativeEvent.contentSize) {
                      this.setState({
                          height: event.nativeEvent.contentSize.height
                      });
                  }
                  this.props.onContentSizeChange && this.props.onContentSizeChange(event);
              }}
              style={[this.props.style, { height: Math.max(35, this.state.height) }]}
              />
        );
    }
}

class NewWish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: '', fontFamily: 'Helvetica', fontSize: 16,
            fontColor: 'black', backgroundPic: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb'
        };

        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        Store.addChangeListener({
            "type": Events.MYWISH_SAVED_EVENT,
            "callback": this.onSaved
        });
    }

    componentWillUnmount() {
        Store.removeChangeListener({
            "type": Events.MYWISH_SAVED_EVENT, "callback": this.onSaved
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
              <ExpandingTextInput
                 maxLength={1024}
                 underlineColorAndroid={'transparent'}
                 onChangeText={(text) => this.setState({
                     wish: text,
                })}
                style={
                    {
                        fontFamily: this.state.fontFamily,
                        fontSize: this.state.fontSize,
                        color: this.state.fontColor,
                        flex: 1,
                    }
                }
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
                      <Picker.Item label="Helvetica" value="Helvetica" />
                      <Picker.Item label="Optima" value="Optima" />
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
                      <Picker.Item label="12" value="12" />
                      <Picker.Item label="14" value="14" />
                      <Picker.Item label="16" value="16" />
                      <Picker.Item label="18" value="18" />
                      <Picker.Item label="20" value="20" />
                      <Picker.Item label="22" value="22" />
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
                    <Text style={
                              {
                                  fontFamily: this.state.fontFamily,
                                  fontSize: this.state.fontSize,
                                  color: this.state.fontColor,
                              }
                          }>
                      {this.state.wish}
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{flex: 3}}>
                  <Button
                     onPress={this.submit}
                     title="Say to WORLD"
                     color="#841584"
                     />
                </View>
            </View>
  	    );
    }
}

module.exports = NewWish;
