import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { createStackNavigator, NavigationActions } from 'react-navigation';

import Board from './src/components/Board';
import Login from './src/components/Login';
import MyWish from './src/components/MyWish';
import NewWish from './src/components/NewWish';
import HomeScreen from './src/components/Home';
import Actions from './src/actions/Actions';

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

const defaultGetStateForAction = RootStack.router.getStateForAction;

RootStack.router.getStateForAction = (action, state) => {
  if (state &&
      action.type === NavigationActions.BACK &&
      state.routes[state.index].params &&
      state.routes[state.index].params.isEditing)
  {
    console.log("have to confirm it!");
    Alert.alert(
      'Info',
      'Whooooo :)',
      [
        {text: 'OK', onPress: () => Actions.confirmCancelEdit()},
      ],
      { cancelable: false }
    );
    return null;
  }
  return defaultGetStateForAction(action, state);
};

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}