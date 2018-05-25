'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground
} from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {getDate} from '../common/Util';

class Wish extends React.Component {
  constructor(props) {
    super(props);

    this.state = props.wish;

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener({
      "type": Events.THUMB_UP_EVENT, "callback": this.onChange
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      "type": Events.THUMB_UP_EVENT, "callback": this.onChange
    });
  }

  onChange() {
    console.log(Store.getWish(this.state.id));
    this.setState(Store.getWish(this.state.id));
  }

  handleClick() {
    Actions.thumbUp(this.state.id);
  }

  render() {
    const { wish, fontFamily, fontSize, fontColor, thumbs, createdTimestamp } = this.state;
    const fontStyle = {
      fontSize: fontSize, color: fontColor,
      fontFamily: fontFamily,       
    };
    return (
	    <View style={{flexDirection: 'column', flex: 1}}>
        <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={fontStyle}>
            {this.state.wish}
          </Text>
        </View>
        <ImageBackground
           style={{
             flex: 1, flexDirection: 'row',
             alignItems: 'center', backgroundColor: 'white', marginBottom: 0
           }}
           source={require('../../assets/botton_background.jpg')}
           >
          <View style={{ flex : 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderRadius: 10 }}>
            <TouchableOpacity onPress={this.handleClick} style={{ flex : 1, alignItems: 'flex-end' }}>
              <Image
                 style={{ width: 20, height: 20 }}
                 source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
                 />
            </TouchableOpacity>
 		        <Text style={{ flex : 1, alignItems: 'flex-start', fontFamily: 'HoeflerText-Italic', fontSize: 20 }}>
              {thumbs}
            </Text>
          </View>
          <View style={{ flex : 1}}>
            <Text style={{ fontFamily: 'HoeflerText-Italic', fontSize: 20 }}>
              {getDate(createdTimestamp)}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

module.exports = Wish;
