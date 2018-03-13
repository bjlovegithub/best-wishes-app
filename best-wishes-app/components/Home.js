import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import SideMenu from 'react-native-side-menu';

import Menu from '../components/Menu';
import Board from '../components/Board';

class HomeScreen extends React.Component {
  render() {
    const menu = <Menu />;
    return (
      <View style={{marginTop: 20, flex: 1}}>
        <SideMenu menu={menu}>
          <Board />
        </SideMenu>
      </View>
    );
  };
}

module.exports = HomeScreen;
