'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  ImageBackground, Alert,
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';

class MyWish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wish: []};

    this.onChange = this.onChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener({"type": Events.MYWISH_LOADED_EVENT, "callback": this.onChange});
    Store.addChangeListener({"type": Events.MYWISH_DELETED_EVENT, "callback": this.onChange});

    Actions.loadMyWish();
  }

  componentWillUnmount() {
    Store.removeChangeListener({"type": Events.MYWISH_LOADED_EVENT, "callback": this.onChange});
    Store.removeChangeListener({"type": Events.MYWISH_DELETED_EVENT, "callback": this.onChange});
  }

  onChange() {
    this.setState({wish: Store.getMyWish().wish});
  }

  handleUpdate(idx) {
    Store.setMyWishForUpdate(this.state.wish[idx]);
    this.props.navigation.navigate('NewWish');
  }

  handleDelete(idx) {
    Alert.alert(
      'Caution',
      'Are sure to delete this wish :(',
      [
        {text: 'Sure', onPress: () => Actions.deleteMyWish(this.state.wish[idx])},
        {text: 'Dismiss', onPress: () => undefined},
      ],
    );
  }

  makeSwipeButton(idx) {
    var swipeoutBtns = [
      {
        text: 'Update',
        backgroundColor: '#0040ff',
        onPress: () => this.handleUpdate(idx),
        idx: idx,
      },
      {
        text: 'Delete',
        backgroundColor: '#ff0000',
        onPress: () => this.handleDelete(idx),        
        idx: idx,
      }
    ];

    return swipeoutBtns;
  }

  render() {
    var wishArr = [];

  	for(let i = 0; i < this.state.wish.length; i++) {
  		wishArr.push(
        <Swipeout key = {i} right={this.makeSwipeButton(i)} autoClose={true}>
  			  <View style = {{flex:1}}>
            <ImageBackground
               style= {{
                 flex: 1,
                 justifyContent: 'center',
                 height: 200,
               }}
               source={{ uri: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}>
              <View style={{flex: 1}}>
                <Text>{ this.state.wish[i].wish }</Text>
              </View>
            </ImageBackground>
  			  </View>
        </Swipeout>
  		);
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
