'use strict';

import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

import Wish from './Wish';

import styles from '../styles/main';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.board} >
      <ImageBackground style={{
            flex: 1,
            justifyContent: 'center'}}
            source={{ uri: 'https://images.pexels.com/photos/17679/pexels-photo.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
            >
            <Wish id=1 style={styles.wish} />
  		</ImageBackground>
      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
            >
            <Wish id=2 style={styles.wish} />
      </ImageBackground>

      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
            >
            <Wish id=3 style={styles.wish} />
      </ImageBackground>

      </View>
    );
  }
}

module.exports = Board;
