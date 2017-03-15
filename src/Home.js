import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Text } from 'native-base';
import AppFooter from './AppFooter.js';
import ImsRequest from './ImsRequest.js';

export default class Home extends Component {

  state = {
    version: null,
  }

  componentWillMount = async () => {
    try {
      const version = await ImsRequest.getVersion(this.props.credentials);
      this.setState({version});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Home</Title></Body>
        </Header>
        <Content>
          <Text>{this.props.credentials.server}</Text>
          <Text>has Version</Text>
          <Text>{this.state.version}</Text>
        </Content>
        <AppFooter
          homeActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
