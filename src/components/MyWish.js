'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  ImageBackground, Alert, RefreshControl
} from 'react-native';

import Swipeout from 'react-native-swipeout';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {BG_PICS} from '../common/Constants';
import {getDate, checkRequestError} from '../common/Util';

import styles from '../styles/MyWish';

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
    checkRequestError(this);

    const { wish } = this.state;    
    var wishArr = [];

  	for(let i = 0; i < wish.length; i++) {
      const fontStyle = {
        fontFamily: wish[i].fontFamily,
        color: wish[i].fontColor,
        fontSize: wish[i].fontSize
      };
  		wishArr.push(
        <Swipeout key = {i} right = {this.makeSwipeButton(i)} autoClose = {true}>
  			  <View style = {styles.swipeView}>
            <ImageBackground
               style = {styles.backgroundImage}
               source = {BG_PICS[wish[i].backgroundPic]}>
              <View style = {styles.dateView}>
                <Text style = {fontStyle}>{ wish[i].wish }</Text>
                <Text style = {styles.countView}>
                  { getDate(wish[i].createdTimestamp) } with { wish[i].thumbs } supports
                </Text>
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
