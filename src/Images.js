import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Text } from 'native-base';
import AppFooter from './AppFooter.js';

export default class Images extends Component {

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Images</Title></Body>
        </Header>
        <Content>
          <Text>Maybe show something here... :-)</Text>
        </Content>
        <AppFooter
          imagesActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
