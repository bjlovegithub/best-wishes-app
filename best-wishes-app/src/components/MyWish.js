'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground } from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';

class MyWish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wish: []};

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener({"type": "mywish_loaded_event", "callback": this.onChange});

    Actions.loadMyWish();
  }

  componentWillUnmount() {
    Store.removeChangeListener({"type": "mywish_loaded_event", "callback": this.onChange});
  }

  onChange() {
    this.setState(Store.getMyWish());
  }

  render() {
    var wishArr = [];

  	for(let i = 0; i < this.state.wish.length; i++) {
  		wishArr.push(
  			<View key = {i} style = {{flex:1}}>
          <ImageBackground style={{
            flex: 1,
            justifyContent: 'center',
            height: 200,
            }}
            source={{ uri: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
          >
            <View style={{flex: 1}}>
              <Text>{ this.state.wish[i].content }</Text>
            </View>
          </ImageBackground>
  			</View>
  		)
  	}

  	return (
  		<View style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <ScrollView>
  			   { wishArr }
        </ScrollView>
  		</View>
  	);
  }
}

module.exports = MyWish;
