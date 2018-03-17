import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { StackNavigator } from 'react-navigation';

import Board from './src/components/Board';
import Login from './src/components/Login';
import HomeScreen from './src/components/Home';

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
