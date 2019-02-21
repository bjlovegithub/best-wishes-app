'use strict';

import React from 'react';
import {
  View, Image, TouchableOpacity, Text, Alert
} from 'react-native';
import { Button } from 'react-native-elements';

import { GoogleSignin } from 'react-native-google-signin';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import { GOOGLE_IOS_CLIENT_ID } from '../common/Constants';
import {checkRequestError} from '../common/Util';

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
    this.onVerified = this.onVerified.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});
    AuthStore.addChangeListener({"type": Events.GOOGLE_ID_VERIFIED_EVENT, "callback": this.onVerified});

    Actions.loadAuthToken();
  }

  componentWillUnmount() {
    AuthStore.removeChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});
    AuthStore.removeChangeListener({"type": Events.GOOGLE_ID_VERIFIED_EVENT, "callback": this.onVerified});
  }

  onVerified() {
    // callback function for verifyGoogleIdToken()
    const auth = AuthStore.getAuthInfo();

    if (auth.googleIdVerified == true)
      Actions.saveAuthToken(auth, "google-auth-token");
    else
      Actions.loginFailed();
  }

  onChange() {
    const error = AuthStore.getError();
    if (error != null) {
      Alert.alert(
        'Error',
        error.message,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    } else {   
      this.setState(AuthStore.getAuthInfo());
    }
  }

  verifyGoogleIdToken(token) {
    Actions.verifyGoogleIdToken(token);
  }

  async googleSignIn() {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.verifyGoogleIdToken(userInfo);
    } catch (error) {
      console.log(error);
      /*
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      */
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
    checkRequestError(this);
    
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
      if (this.state.loginFailed) {
        Alert.alert(
          'Error',
          this.state.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );
      }

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
