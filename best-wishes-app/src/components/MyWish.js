'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';

class MyWish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLogin: false, picUrl: '', name: ''};

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  onChange() {
    this.setState(Store.getAuthInfo());
  }

  render() {
    return (
    <View>
      <Text>Hahaha</Text>
    </View>
    );
  }
}

module.exports = MyWish;
