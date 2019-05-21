'use strict';

import React from 'react';
import {
  StyleSheet, View, ImageBackground, Dimensions, Alert, ActivityIndicator
} from 'react-native';

import Wish from './Wish';
import styles from '../styles/Main';
import {BG_PICS} from '../common/Constants';

const window = Dimensions.get('window');

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var arr = [];
    const { wishes } = this.props;
    for (var prop in wishes) {
      if (wishes.hasOwnProperty(prop)) {
        arr.push(
          <ImageBackground
             style={styles.background}
             source={BG_PICS[wishes[prop].backgroundPic]}
             key={prop}
             >
            <Wish wish={wishes[prop]}
              style={styles.wish}
              navigation={this.props.screenProps.rootNavigation}
            />
          </ImageBackground>
        );
      }
    }
    
    return (
      <View style={styles.board} >
        {arr}
      </View>
    );
  }
}

module.exports = Board;
