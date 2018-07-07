import React from 'react';
import { View } from 'react-native';

import SideMenu from 'react-native-side-menu';

import Menu from '../components/Menu';
import Board from '../components/Board';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menu = <Menu screenProps={{ rootNavigation: this.props.navigation }} />;
    return (
      <View style={{flex: 1}}>
        <SideMenu menu={menu}>
          <Board screenProps={{ rootNavigation: this.props.navigation }}/>
        </SideMenu>
      </View>
    );
  };
}

module.exports = HomeScreen;
