'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Wish extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{paddingBottom: 20,}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue'}}>
          My Simple Wish, quite long line.....................................
        </Text>
        <Text>My Simple Wish</Text>
        <Text>My Simple Wish</Text>
        <Text>My Simple Wish</Text>
        <Text>My Simple Wish</Text>
        <Text>My Simple Wish</Text>
        <Text>My Simple Wish</Text>
      </View>
    );
  }
}
