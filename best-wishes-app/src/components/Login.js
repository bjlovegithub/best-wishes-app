'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image,
  Button, TouchableOpacity
} from 'react-native';
import Expo from 'expo';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';

const IOS_CLIENT_ID = '241139739568-oqrrk998b60tc8d0b3e4bhjnf4bms0qh.apps.googleusercontent.com';

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
    console.log(AuthStore.getAuthInfo());
    this.setState(AuthStore.getAuthInfo());
  }

  async googleSignIn() {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
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

  googleSignOut() {
    // TODO
  }

  render() {
    if (this.state.isLogin) {
      return (
        <View>
          <Image
            style={{ width: 80, height: 80 }}
            source={{uri: this.state.picUrl}}
          />
          <TouchableOpacity onPress={() => {this.googleSignOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View>
          <Button
             onPress={this.googleSignIn}
             title="Learn More"
             color="#841584"
             accessibilityLabel="Learn more about this purple button"
             />
        </View>
      );
    }

  }
}

module.exports = Login;
