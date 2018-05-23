'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableOpacity
} from 'react-native';
import Expo from 'expo';
import { Button } from 'react-native-elements';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import { GOOGLE_IOS_CLIENT_ID } from '../common/Constants';

const GOOGLE_SIGNIN_ICON = require('../../assets/btn_google_signin.png');

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false, picUrl: '', name: ''};

    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});

    Actions.loadAuthToken();
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});
  }

  onChange() {
    this.setState(AuthStore.getAuthInfo());
  }

  async googleSignIn() {
    console.log(GOOGLE_IOS_CLIENT_ID);
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        Actions.saveAuthToken(result, "google-auth-token");
      } else {
        console.log('Google login failed.');
      }
    } catch(e) {
      console.log('Google login failed: ' + e);
    }
  }

  async googleSignOut() {
    Actions.deleteAuthToken("google-auth-token");
  }

  render() {
    if (this.state.isLogin) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
             style={{ width: 80, height: 80, borderRadius: 24 }}
             source={{ uri: this.state.picUrl }} />
          <View style={{marginTop: 30}}>
            <Button
               borderRadius= { 6 }
               backgroundColor = '#4054B2'
               onPress={ this.googleSignOut }
               fontSize= { 14 }
               title='Logout' />
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={this.googleSignIn}>
            <Image
               source={GOOGLE_SIGNIN_ICON}
               style={{height: 50, resizeMode: 'contain'}}
               />
          </TouchableOpacity>
        </View>
      );
    }

  }
}

module.exports = Login;
