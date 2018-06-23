'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image, ScrollView,
  ImageBackground, Alert, RefreshControl
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {getDate} from '../common/Util';

class MyWish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wish: [], refreshing: false};

    this.onChange = this.onChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
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

  handleRefresh() {
    this.setState({refreshing: true});
    Actions.loadMyWish();
  }

  onChange() {
    this.setState({wish: Store.getMyWish().wish, refreshing: false});
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
    const { wish } = this.state;
    
    var wishArr = [];

  	for(let i = 0; i < wish.length; i++) {
      const fontStyle = {
        fontFamily: wish[i].fontFamily,
        color: wish[i].fontColor,
        fontSize: wish[i].fontSize
      };
  		wishArr.push(
        <Swipeout key = {i} right={this.makeSwipeButton(i)} autoClose={true}>
  			  <View style = {{flex:1}}>
            <ImageBackground
               style= {{
                 flex: 1,
                 justifyContent: 'center',
                 height: 200,
               }}
               source={{ uri: wish[i].backgroundPic }}>
              <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={fontStyle}>{ wish[i].wish }</Text>
                <Text style={{ fontFamily: 'HoeflerText-Italic', fontSize: 20 }}>{ getDate(wish[i].createdTimestamp) } with { wish[i].thumbs } supports</Text>
              </View>
            </ImageBackground>
  			  </View>
        </Swipeout>
  		);
  	}

    const refresh = <RefreshControl onRefresh={this.handleRefresh} refreshing={this.state.refreshing} />;

  	return (
  		<View style={{flex: 1}} contentContainerStyle={{flex: 1}}>
        <ScrollView refreshControl={refresh}>
          { wishArr }
        </ScrollView>
  		</View>
  	);
  }
}

module.exports = MyWish;
