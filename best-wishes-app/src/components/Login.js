'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

//import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Store from '../store/Store'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false};
  }


  render() {
    return (
      <Text></Text>
    );
  }
}

module.exports = Login;
