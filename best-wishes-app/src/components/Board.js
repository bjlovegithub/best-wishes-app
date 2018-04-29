'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, ImageBackground, Image,
  ScrollView, Dimensions, Button
} from 'react-native';

import Wish from './Wish';
import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import styles from '../styles/main';

const window = Dimensions.get('window');

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {wishes: []};

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({wishes: Store.getBoardWish()});
  }

  componentWillMount() {
    Actions.fetchBoardWish();

    Store.addChangeListener({
      "type": Events.BOARD_WISH_EVENT, "callback": this.onChange
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      "type": Events.BOARD_WISH_EVENT, "callback": this.onChange
    });
  }

  render() {
    var arr = [];
    const { wishes } = this.state;
    for (let i = 0; i < wishes.length; ++i) {
      arr.push(
        <ImageBackground
           style={{
             flex: 1,
             justifyContent: 'center'
           }}
           source={{
             uri: wishes[i].backgroundPic
           }}>
          <Wish wish={wishes[i]} style={styles.wish} />
        </ImageBackground>
      );
    }
    
    return (
      <View style={styles.board} >
        {arr}
      </View>
    );
  }
}

module.exports = Board;
