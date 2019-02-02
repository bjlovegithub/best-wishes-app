'use strict';

import {
  Alert
} from 'react-native';

import Store from '../store/Store';
import ErrorType from '../common/ErrorType';

export function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var hours = date.getFullYear();
  var minutes = "0" + (date.getMonth() + 1);
  var seconds = "0" + date.getDate();
  return hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2);
}

export function checkRequestError(component) {
  const actionState = Store.getLastActionInfo();
  if (actionState.failed == true) {    
    const func = null;
    if (actionState.type == ErrorType.ERR_AUTH_FAILED) {
      func = () => component.props.navigation.navigate('Login');
    } else {
      func = () => {};
    }

    Alert.alert(
      'Error',
      actionState.error,
      [
        {text: 'OK', onPress: func},
      ],
      { cancelable: false }
    );
  }
}
