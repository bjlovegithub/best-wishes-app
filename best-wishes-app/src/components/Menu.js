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
  FlatList,
} from 'react-native';
import { List, ListItem } from "react-native-elements";

import AuthStore from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';

const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const DEFAULT_NAME = 'Happy :)';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#ECEFF0',
    padding: 6,
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
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 15,
    textDecorationLine: 'underline',
  },
});

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false, picUrl: uri, name: DEFAULT_NAME,
      items: [
        {
          name: 'My Wishes',
          sub_title: 'List and Update My Wishes',
          pic: require('../../assets/new_wish_icon.png'),
        },
        {
          name: 'New Wish',
          sub_title: 'Create A New Wish',
          pic: require('../../assets/new_wish_icon.png'),
        },
      ],
    };

    this.onItemSelected = this.onItemSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const auth = AuthStore.getAuthInfo();
    if (auth.isLogin === true) {
      this.setState(AuthStore.getAuthInfo());
    }
    else {
      this.setState({isLogin: false, picUrl: uri, name: DEFAULT_NAME});
    }
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
        </View>
        <Text style={styles.name}>{this.state.name}</Text>

        <FlatList
           data={this.state.items}
           keyExtractor={(item, index) => index }
           renderItem={ ({ item }) => (
             <ListItem
                roundAvatar
                subtitle={ item.sub_title }
                avatar={ item.pic } />
           )}
        />
        
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
