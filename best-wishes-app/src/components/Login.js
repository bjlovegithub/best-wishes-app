'use strict';

import React from 'react';
import {
  View, Image, TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-elements';

import { GoogleSignin } from 'react-native-google-signin';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import { GOOGLE_IOS_CLIENT_ID } from '../common/Constants';

import styles from '../styles/Login';

const GOOGLE_SIGNIN_ICON = require('../../assets/btn_google_signin.png');

GoogleSignin.configure({
  iosClientId: GOOGLE_IOS_CLIENT_ID,
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false, picUrl: '', name: '', isSigninInProgress: false};

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
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      Actions.saveAuthToken(userInfo, "google-auth-token");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }    
    /*
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
     */
  }

  async googleSignOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      
      Actions.deleteAuthToken("google-auth-token");      
    } catch (error) {
      console.error(error);
    }    
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
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={this.googleSignIn}>
            <Image
               source={GOOGLE_SIGNIN_ICON}
               style={styles.image}
               />
          </TouchableOpacity>
        </View>
      );
    }

  }
}

module.exports = Login;
