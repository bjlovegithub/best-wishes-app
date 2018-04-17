'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false, picUrl: '', name: ''};

    this.googleSignIn = this.googleSignIn.bind(this);
    this.googleSignOut = this.googleSignOut.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setupGoogleSignin();

    AuthStore.addChangeListener({"type": "auth_event", "callback": this.onChange});

    Actions.loadAuthToken();
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener({"type": "auth_event", "callback": this.onChange});
  }

  onChange() {
    console.log(AuthStore.getAuthInfo());
    this.setState(AuthStore.getAuthInfo());
  }

  googleSignIn() {
    GoogleSignin.signIn()
      .then((user) => {
        Actions.saveAuthToken(user, "google-auth-token");
      })
      .catch((err) => {
        console.log('WRONG SIGNIN', err);
      })
      .done();
  }

  googleSignOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      Actions.deleteAuthToken("google-auth-token");
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
    }
    catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
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
          <GoogleSigninButton
            style={{width: 212, height: 48}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            onPress={this.googleSignIn.bind(this)}/>
        </View>
      );
    }

  }
}

module.exports = Login;
