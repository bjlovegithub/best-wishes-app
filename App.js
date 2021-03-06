import React from 'react';
import { Text, View, Button, Alert, Image, ActivityIndicator } from 'react-native';

import SideMenu from 'react-native-side-menu';

import { createStackNavigator, NavigationActions } from 'react-navigation';

import AppIntroSlider from 'react-native-app-intro-slider';

import { Icon } from 'react-native-elements';

import Board from './src/components/Board';
import Login from './src/components/Login';
import MyWish from './src/components/MyWish';
import NewWish from './src/components/NewWish';
import Feedback from './src/components/Feedback';
import HomeScreen from './src/components/Home';
import Actions from './src/actions/Actions';
import AppStore from './src/store/Store';
import Events from './src/common/Events';

import Styles from './src/styles/App';
import CommonStyles from './src/styles/Common';

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
    title: '',
    text: 'Share Your Wishes',
    image: require('./assets/slide1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: '',
    text: 'Right Slide To Manage Wishes',
    image: require('./assets/slide2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: '',
    text: 'Color Your Wish',
    image: require('./assets/slide3.png'),
    backgroundColor: '#22bcb5',
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showRealApp: false, loading: true,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener({
      "type": Events.APP_SLIDER_FLAG_EVENT, "callback": this.onChange
    });
    
    Actions.loadShowAppIntroSliderFlag();
  }

  componentWillUnmount() {
    AppStore.removeChangeListener({
      "type": Events.APP_SLIDER_FLAG_EVENT, "callback": this.onChange
    });
  }

  onChange() {
    const show = AppStore.getShowAppIntroSliderFlag();
    if (show == true) {
      this.setState({
        showRealApp: false, loading: false,
      });
    } else {
      this.setState({
        showRealApp: true, loading: false,
      });
    }
    
  }
    
  _renderItem = (item) => {
    return (
      <View style={Styles.slideView}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Image source={item.image} style={Styles.image} />
        <Text></Text>
        <Text></Text>        
        <Text style={Styles.slideText}>{item.text}</Text>
      </View>
    );
  }
  
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });

    // save the app intro slider flag into store
    AppStore.saveShowAppIntroSliderFlag(false);
  }

  _renderNextButton = () => {
    return (
      <View style={Styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          type='ionicon'
        />
      </View>
    );
  }
  
  _renderDoneButton = () => {
    return (
      <View style={Styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          type='ionicon'
        />
      </View>
    );
  }  
  
  render() {
    console.log(AppStore.getShowAppIntroSliderFlag());
    console.log(this.state.showRealApp);
    console.log(this.state.loading);

    if (this.state.loading) {
      return (
        <View style = {CommonStyles.indicator}>
          <ActivityIndicator size = "large" />
        </View>
      );
    }
    
    if (this.state.showRealApp) {
      return <RootStack />;
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem} slides={slides} onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
        />
      );
    }
  }  
}
