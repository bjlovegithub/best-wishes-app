import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { StackNavigator } from 'react-navigation';

import Board from './components/Board';
import Login from './components/Login';
import HomeScreen from './components/Home';

export default StackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: HomeScreen,
  }
},

{
  initialRouteName: 'Home',
});
