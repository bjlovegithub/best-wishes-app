import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SideMenu from 'react-native-side-menu';

import Board from './components/Board';
import Menu from './Menu';

export default class App extends React.Component {

  onMenuItemSelected(item) {}

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu menu={menu}>
        <Board />
      </SideMenu>
    );
  };
}
