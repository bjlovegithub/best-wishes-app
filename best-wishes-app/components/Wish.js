'use strict';

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Wish extends React.Component {
  constructor(props) {
    super(props);

    this.state = { wish: undefined, thumbs: 0 } ;
  }

  async function getData() {
    try {
      const response = await fetch(
        'http://localhost:9999/wish/' + this.props.id, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }
      );
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  componentWillMount() {
    const data = getData();
    this.setState({ wish: data.wish, thumbs: data.thumbs });
  }

  render() {
    return (
      <View style={{paddingBottom: 20,}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue'}}>
          {this.state.wish}
        </Text>
      </View>

      <Image style={{
            //flex: 1,
            width: 20,
            height: 20,
            bottom: 0,
            left: 10
        }}
        source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
      />
    );
  }
}
