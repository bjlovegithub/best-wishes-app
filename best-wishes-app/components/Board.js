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
            <Wish style={styles.wish} />
            <Image style={{
                  //flex: 1,
                  width: 20,
                  height: 20,
                  bottom: 0,
                  left: 10
              }}
              source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
            />
  		</ImageBackground>
      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://images.pexels.com/photos/36764/marguerite-daisy-beautiful-beauty.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
            >
            <Wish style={styles.wish} />
      </ImageBackground>

      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb' }}
            >
            <Wish style={styles.wish} />
      </ImageBackground>

      </View>
    );
  }
}

module.exports = Board;
