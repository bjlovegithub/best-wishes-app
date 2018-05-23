import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { createStackNavigator } from 'react-navigation';

import Board from './src/components/Board';
import Login from './src/components/Login';
import MyWish from './src/components/MyWish';
import NewWish from './src/components/NewWish';
import HomeScreen from './src/components/Home';

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login',
		  }
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Best Wishes',
		  }
    },
    MyWish: {
      screen: MyWish,
      navigationOptions: {
        title: 'My Wish',
		  }
    },
    NewWish: {
      screen: NewWish,
      navigationOptions: {
        title: 'New Wish',
		  },
      navigationOptions: {
        gesturesEnabled: false,
      },
    }
  },

  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
