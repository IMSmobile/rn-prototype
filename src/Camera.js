import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Body, Title, Text, Button } from 'native-base';
import AppFooter from './AppFooter.js';
import ImagePicker from 'react-native-image-picker';

export default class Camera extends Component {

  state = {
    picture: null,
  }

  captureFromCamera = () => {
    ImagePicker.launchCamera({}, (response) => {
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
          <Body><Title>Camera</Title></Body>
        </Header>
        <Content style={{ padding: 20 }}>
          <Button
            onPress={this.captureFromCamera}>
            <Text>Take a picture</Text>
          </Button>
          <Text>Your latest snapshot:</Text>
          {(this.state.picture === null) &&
            <Text>(none yet)</Text>
           }
          <Image style={{ width: 150, height: 150, margin: 20 }}
            source={{ uri: this.state.picture }} />
        </Content>
        <AppFooter
          cameraActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
