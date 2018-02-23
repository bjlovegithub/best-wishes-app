import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SideMenu from 'react-native-side-menu';

import Board from './components/Board';
import Menu from './Menu';

class ContentView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
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
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default class App extends React.Component {

  onMenuItemSelected(item) {}


  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (

            <SideMenu menu={menu}>
            <View>
              <ContentView />
              <Board />
            </View>
            </SideMenu>
          );


  };
}
