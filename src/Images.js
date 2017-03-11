import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Text, Button } from 'native-base';
import AppFooter from './AppFooter.js';
import ImagePicker from 'react-native-image-picker';

export default class Images extends Component {

  captureFromImageLibrary = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const { uri } = response;
        this.setState({ picture: uri });
      }
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Images</Title></Body>
        </Header>
        <Content style={{ padding: 20 }}>
          <Button onPress={this.captureFromImageLibrary}>
            <Text>Select one Picture</Text>
          </Button>
        </Content>
        <AppFooter
          imagesActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
