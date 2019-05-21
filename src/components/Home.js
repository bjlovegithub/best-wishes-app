import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import SideMenu from 'react-native-side-menu';

import Menu from '../components/Menu';
import Board from '../components/Board';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import Store from '../store/Store';
import {checkRequestError} from '../common/Util';

import CommonStyles from '../styles/Common';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {wishes: [], loading: true};

    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    this.setState({wishes: Store.getBoardWish(), loading: false});
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

    // display loading icon if the wish data is not ready
    if (this.state.loading) {
      return (
        <View style = {CommonStyles.indicator}>
          <ActivityIndicator size = "large" />
        </View>
      );
    }
    
    const menu = <Menu screenProps={{ rootNavigation: this.props.navigation }} />;
    return (
      <View style={{flex: 1}}>
        <SideMenu menu={menu}>
          <Board
             screenProps={{ rootNavigation: this.props.navigation }}
             wishes={this.state.wishes}
          />
        </SideMenu>
      </View>
    );
  };
}

module.exports = HomeScreen;
