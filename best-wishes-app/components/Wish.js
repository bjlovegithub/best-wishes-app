'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import Store from '../stores/Store';

export default class Wish extends React.Component {
  constructor(props) {
    super(props);

    this.state = { wish: undefined, thumbs: 0, sid: undefined } ;
  }

  componentWillMount() {
    this.setState(Store.getWish(this.props.id));

    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  }

  render() {
    return (
	     <View style={{flexDirection: 'column', flex: 1}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue', flex: 6}}>
          {this.state.wish}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', marginBottom: 0}}>
        <Image style={{
          width: 20,
          height: 20,
        }}
        source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
        />
 		     <Text>
        {this.state.thumbs}
        </Text>
        </View>
      </View>
    );
  }
}
