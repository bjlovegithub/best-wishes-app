'use strict';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Wish from './Wish';

import styles from '../styles/main';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.board}>
        <Wish style={styles.wish} />
        <Wish style={styles.wish} />
        <Wish style={styles.wish} />
      </View>
    );
  }
}

module.exports = Board;
