import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Text } from 'native-base';
import AppFooter from './AppFooter.js';
import { Buffer } from 'buffer';

export default class Home extends Component {

  state = {
    error: false,
    version: null,
  }

  componentWillMount = async () => {
    this.getVersion();
  }

  getVersion = async () => {
    const { server, username, password } = this.props.credentials;

    const authHash = new Buffer(username + ':' + password).toString('base64');
    const reqOptions = {
      method: 'GET',
      headers: {
        'Authorization': "Basic " + authHash,
      },
    }
    try {
      const res = await fetch(server, reqOptions);
      if (res.ok) {
        const data = await res.json();
        const infoUrl = data.links.filter(links => links.link === "info")[0].dataHref;
        const infoRes = await fetch(infoUrl, reqOptions);
        const info = await infoRes.json();
        const version = info.version;
        this.setState({ version })
      } else {
        this.setState({ error: "Login Failed (Status " + res.status + ")" })
      }
    } catch (e) {
      this.setState({ error: e.toString() })
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
