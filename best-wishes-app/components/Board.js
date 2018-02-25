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
            source={{ uri: 'https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png' }}
            >
            <Wish style={styles.wish} />
  		</ImageBackground>
      <Image
        source={{uri: 'http://www.freshwater-uk.com/wp-content/uploads/thumbs-up.png'}}
      />

      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png' }}
            >
            <Wish style={styles.wish} />
      </ImageBackground>

      <ImageBackground style={{
            flex: 1,
            //position: 'absolute'
            justifyContent: 'center'}}
            source={{ uri: 'https://www.google.com.au/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png' }}
            >
            <Wish style={styles.wish} />
      </ImageBackground>

      </View>
    );
  }
}

module.exports = Board;
