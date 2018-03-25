'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';

class Wish extends React.Component {
  constructor(props) {
    super(props);

    const id = props.id;

    this.state = {};
    this.state[id] = {wish: undefined, thumbs: 0, sid: undefined};

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    Store.fetchWish(this.props.id);

    Store.addChangeListener({"type": "wish_event", "callback": this.onChange});
  }

  componentWillUnmount() {
    Store.removeChangeListener({"type": "wish_event", "callback": this.onChange});
  }

  onChange() {
    const map = Store.getWish(this.props.id);
    if (map !== undefined && map != null) {
      this.setState(map);
    }
  }

  handleClick() {
    Actions.thumbUp(this.props.id);
  }

  render() {
    return (
	     <View style={{flexDirection: 'column', flex: 1}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue', flex: 6}}>
          {this.state.wish}
        </Text>
        <View style={{
          flex: 1, flexDirection: 'row', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'white', marginBottom: 0
        }}>
        <TouchableOpacity onPress={this.handleClick}>
          <Image
            style={{ width: 20, height: 20 }}
            source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
          />
        </TouchableOpacity>
 		    <Text>
          {this.state.thumbs}
        </Text>
        </View>
      </View>
    );
  }
}

module.exports = Wish;
