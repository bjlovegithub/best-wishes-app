'use strict';

import React from 'react';
import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';

// Reference from https://reactnative.fun/2017/06/21/expanding-textinput/
class ExpandingTextInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  focus () {
    this.textInput && this.textInput.focus()
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
            })
          }
          this.props.onContentSizeChange && this.props.onContentSizeChange(event)
        }}
        style={[this.props.style, { height: Math.max(35, this.state.height) }]}
      />
    )
  }
}

class NewWish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wish: '', fontFamily: 'Helvetica', fontSize: 20};

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  onChange() {
  }

  render() {
    return (
      <View>
        <ExpandingTextInput
          maxLength={1024}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({
            wish: text,
            fontFamily: this.state.fontFamily,
            fontSize: this.state.fontSize,
          })}
          style={
            {
              fontFamily: this.state.fontFamily,
              fontSize: this.state.fontSize,
            }
          }
        />
        <Picker
          selectedValue={this.state.fontFamily}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({
            wish: this.state.wish,
            fontFamily: itemValue,
            fontSize: this.state.fontSize,
        })}>
          <Picker.Item label="Helvetica" value="Helvetica" />
          <Picker.Item label="Optima" value="Optima" />
        </Picker>
      </View>
  	);
  }
}

module.exports = NewWish;
