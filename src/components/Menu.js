import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { List, ListItem } from "react-native-elements";

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {checkRequestError} from '../common/Util';

import styles from '../styles/Menu';

const window = Dimensions.get('window');
const DEFAULT_PIC = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const DEFAULT_NAME = 'Happy :)';

const MY_WISH_ICON = require('../../assets/02_ggpw.png');
const NEW_WISH_ICON = require('../../assets/create.png');
const FEEDBACK_ICON = require('../../assets/feedback.png');

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false, picUrl: DEFAULT_PIC, name: DEFAULT_NAME,
      items: [
        {
          name: 'My Wishes',
          sub_title: 'List and Update My Wishes',
          pic: MY_WISH_ICON,
          action: () => { this.onItemSelected('My Wishes'); }
        },
        {
          name: 'New Wish',
          sub_title: 'Create A New Wish',
          pic: NEW_WISH_ICON,
          action: () => { this.onItemSelected('New Wish'); }
        },
        {
          name: 'Feedback',
          sub_title: 'Send us your think',
          pic: FEEDBACK_ICON,
          action: () => { this.onItemSelected('Feedback'); }
        },
      ],
    };

    this.onItemSelected = this.onItemSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    Store.addChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});

    Actions.loadAuthToken();
  }

  componentWillUnmount() {
    Store.removeChangeListener({"type": Events.AUTH_EVENT, "callback": this.onChange});
  }

  onChange() {
    const auth = Store.getAuthInfo();
    if (auth.isLogin === true) {
      this.setState(Store.getAuthInfo());
    }
    else {
      this.setState({isLogin: false, picUrl: DEFAULT_PIC, name: DEFAULT_NAME});
    }
  }

  onItemSelected(sig) {
    if (this.state.isLogin) {
      if (sig === 'My Wishes') {
        this.props.screenProps.rootNavigation.navigate('MyWish');
      }
      else if (sig === 'New Wish') {
        Actions.clearWishInEditor();
        this.props.screenProps.rootNavigation.navigate('NewWish');
      }
      else if (sig === 'Feedback') {
        this.props.screenProps.rootNavigation.navigate('Feedback');
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
    checkRequestError(this);
    
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
