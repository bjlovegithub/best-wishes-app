import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { createStackNavigator, NavigationActions } from 'react-navigation';

import AppIntroSlider from 'react-native-app-intro-slider';

import Board from './src/components/Board';
import Login from './src/components/Login';
import MyWish from './src/components/MyWish';
import NewWish from './src/components/NewWish';
import Feedback from './src/components/Feedback';
import HomeScreen from './src/components/Home';
import Actions from './src/actions/Actions';

// The app uses root stack as the navigator. The stack navigator will
// return to the previous used screen when user tries to go back.
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
    },
    Feedback: {
      screen: Feedback,
      navigationOptions: {
        title: 'Feedback',
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

// Prompt an alert message when leaving the editing screen.
RootStack.router.getStateForAction = (action, state) => {
  if (state &&
      action.type === NavigationActions.BACK &&
      state.routes[state.index].params &&
      state.routes[state.index].params.isEditing)
  {
    console.log("have to confirm it!");
    Alert.alert(
      'Info',
      'Will lose the wish! Are you sure want to leave editing?',
      [
        {text: 'OK', onPress: () => Actions.confirmCancelEdit()},
        {text: 'CANCEL', onPress: () => {}},
      ],
      { cancelable: true }
    );
    return null;
  }
  return defaultGetStateForAction(action, state);
};

// Prepare the introduction screen when first launching the app.
const slides = [
  {
    key: 'somethun',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('./assets/create.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('./assets/create.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    image: require('./assets/create.png'),
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showRealApp: false
    };
  }
    
  _renderItem = (item) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Image source={item.image} />
        <Text>{item.text}</Text>
      </View>
    );
  }
  
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  
  render() {
    if (this.state.showRealApp) {
      return <RootStack />;
    } else {
      return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
    }
  }  
}
