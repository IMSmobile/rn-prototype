import React, { Component } from 'react';
import Home from './Home.js';
import Images from './Images.js';
import Settings from './Settings.js';

export default class App extends Component {

  state = {
    screen: 'home',
  }

  onFooterButtonPress = (screen) => {
    this.setState({ screen })
  }

  render() {
    if (this.state.screen === 'settings') {
      return (
        <Settings
          onFooterButtonPress={this.onFooterButtonPress}
          onLogoutPress={this.props.onLogoutPress}
        />
      )
    } else if (this.state.screen === 'images') {
      return (
        <Images
          onFooterButtonPress={this.onFooterButtonPress}
        />
      )
    } else {
      return (
        <Home
          onFooterButtonPress={this.onFooterButtonPress}
          credentials={this.props.credentials}
        />
      )
    }
  }
}
