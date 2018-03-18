'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import Store from '../store/Store'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false};
  }

  componentDidMount() {
    this.setupGoogleSignin();
  }

  googleAuth() {
    GoogleSignin.signIn()
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '241139739568-oqrrk998b60tc8d0b3e4bhjnf4bms0qh.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  render() {
    return (
      <View>
        <GoogleSigninButton style={{width: 212, height: 48}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Auto} onPress={this.googleAuth.bind(this)}/>
      </View>
    );
  }
}

module.exports = Login;
