'use strict';

import React from 'react';
import {
  StyleSheet, View, ImageBackground, Dimensions, Alert
} from 'react-native';

import Wish from './Wish';
import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import styles from '../styles/Main';
import {BG_PICS} from '../common/Constants';
import {checkRequestError} from '../common/Util';

const window = Dimensions.get('window');

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {wishes: []};

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({wishes: Store.getBoardWish()});
  }

  componentWillMount() {
    Actions.fetchBoardWish();

    Store.addChangeListener({
      "type": Events.BOARD_WISH_EVENT, "callback": this.onChange
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      "type": Events.BOARD_WISH_EVENT, "callback": this.onChange
    });
  }

  render() {
    checkRequestError(this);
    
    var arr = [];
    const { wishes } = this.state;
    for (var prop in wishes) {
      if (wishes.hasOwnProperty(prop)) {
        arr.push(
          <ImageBackground
             style={styles.background}
             source={BG_PICS[wishes[prop].backgroundPic]}
             key={prop}
             >
            <Wish wish={wishes[prop]} style={styles.wish} navigation={this.props.screenProps.rootNavigation}/>
          </ImageBackground>
        );
      }
    }
    
    return (
      <View style={styles.board} >
        {arr}
      </View>
    );
  }
}

module.exports = Board;
