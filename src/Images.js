import React, { Component } from 'react';
import { Container, Header, Content, Body, Title, Text, Button } from 'native-base';
import AppFooter from './AppFooter.js';
import ImagePicker from 'react-native-image-picker';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class Images extends Component {

  state = {
    selectedImages: [],
  }

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

  updateSelectedImages = (images, current) => {
    this.setState({ selectedImages: images });
    console.log(current);
  }

  render() {
    return (
      <Container>
        <Header>
          <Body><Title>Images</Title></Body>
        </Header>
        <Content style={{ padding: 20 }}>
          <Button onPress={this.captureFromImageLibrary}>
            <Text>Select single Picture</Text>
          </Button>
          <Text>Select multiple Pictures</Text>
          {(this.state.selectedImages.length > 0) &&
            <Text>{"Selected " + this.state.selectedImages.length + " Pictures"}</Text>
          }
          <CameraRollPicker callback={this.updateSelectedImages} />
        </Content>
        <AppFooter
          imagesActive={true}
          onFooterButtonPress={this.props.onFooterButtonPress}
        />
      </Container>
    )
  }
}
