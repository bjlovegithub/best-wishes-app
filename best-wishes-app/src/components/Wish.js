'use strict';

import React from 'react';
import {
  Text, View, Image, TouchableOpacity, ImageBackground
} from 'react-native';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {getDate} from '../common/Util';

import styles from '../styles/Wish';

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
	    <View style={styles.wishView}>
        <View style={styles.wishStyle}>
          <Text style={fontStyle}>
            {this.state.wish}
          </Text>
        </View>
        <ImageBackground
           style={styles.backgroundStyle}
           source={require('../../assets/botton_background.jpg')}
           >
          <View style={styles.thumbViewStyle}>
            <TouchableOpacity onPress={this.handleClick} style={{ flex : 1, alignItems: 'flex-end' }}>
              <Image
                 style={styles.thumbImageStyle}
                 source={{uri: 'https://emojipedia-us.s3.amazonaws.com/thumbs/240/apple/118/thumbs-up-sign_1f44d.png'}}
                 />
            </TouchableOpacity>
 		        <Text style={styles.thumbTextStyle}>
              {thumbs}
            </Text>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateTextStyle}>
              {getDate(createdTimestamp)}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

module.exports = Wish;
