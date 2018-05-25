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
    backgroundColor: 'transparent',
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
    fontFamily: 'SavoyeLetPlain',
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    left: 70,
    top: 14,
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
          pic: require('../../assets/02_ggpw.png'),
          action: () => { this.onItemSelected('My Wishes'); }
        },
        {
          name: 'New Wish',
          sub_title: 'Create A New Wish',
          pic: require('../../assets/create.png'),
          action: () => { this.onItemSelected('New Wish'); }
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
          <Text style={styles.name}>{this.state.name}</Text>
        </View>
        
        <View style={{marginTop: 30}}>
          <FlatList
             data={this.state.items}
             keyExtractor={(item, index) => index }
             renderItem={ ({ item }) => (
               <ListItem
                 roundAvatar
                 subtitle={ item.name }
                 onPress={ item.action }
                 avatar={ item.pic } />
            )}/>
        </View>
      </ScrollView>
    );
  }
}

module.exports = Menu;
