import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Button, Text } from 'native-base';
import AppFooter from './AppFooter.js';

export default class Settings extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Settings</Title></Body>
        </Header>
        <Content style={{ padding: 20 }}>
          <Button
            onPress={this.props.onLogoutPress}>
            <Text>Log out</Text>
          </Button>
        </Content>
        <AppFooter
          settingsActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
