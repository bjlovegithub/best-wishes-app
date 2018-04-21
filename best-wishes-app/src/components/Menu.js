import React from 'react';
import PropTypes from 'prop-types';
import {
  Component,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {isLogin: false, picUrl: uri, name: "Happy ;)"};

    this.onItemSelected = this.onItemSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.addChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});

    Actions.loadAuthToken();
  }

  componentWillUnmount() {removeChangeListener
    AuthStore.removeChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});
  }

  onChange() {
    this.setState(AuthStore.getAuthInfo());
  }

  onItemSelected(sig) {
    if (this.state.isLogin) {
      if (sig === 'My Wishes') {
        this.props.screenProps.rootNavigation.navigate('MyWish');
      }
      else if (sig === 'New Wish') {
        this.props.screenProps.rootNavigation.navigate('NewWish');
      }
    }
    else {
      this.props.screenProps.rootNavigation.navigate('Login');
    }
  }

  handleClick() {
    this.props.screenProps.rootNavigation.navigate('Login');
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={this.handleClick}>
            <Image
              style={styles.avatar}
              source={{uri: this.state.picUrl}}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{this.state.name}</Text>
        </View>

        <Text
          onPress={() => this.onItemSelected('My Wishes')}
          style={styles.item}
        >
          My Wishes
        </Text>

        <Text
          onPress={() => this.onItemSelected('New Wish')}
          style={styles.item}
        >
          New Wish
        </Text>
      </ScrollView>
    );
  }
}

module.exports = Menu;
