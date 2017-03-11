import React, { Component } from 'react';
import { Footer, FooterTab, Button, Badge, Body, Icon, Text } from 'native-base';

export default class AppFooter extends Component {

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.props.homeActive}
            onPress={() => this.props.onFooterButtonPress('home')} >
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            active={this.props.cameraActive}
            onPress={() => this.props.onFooterButtonPress('camera')} >
            <Icon name="camera" />
            <Text>Camera</Text>
          </Button>
          <Button
            active={this.props.imagesActive}
            onPress={() => this.props.onFooterButtonPress('images')} >
            <Icon name="image" />
            <Text>Images</Text>
          </Button>
          <Button
            active={this.props.settingsActive}
            onPress={() => this.props.onFooterButtonPress('settings')} >
            <Icon name="settings" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}
