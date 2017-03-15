import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import App from './App.js';
import Login from './Login.js';

const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'

export default class LoginSwitch extends Component {
  state = {
    'isLoggedIn': false,
    'server': null,
    'username': null,
    'password': null,
  }

  loadCredentials = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY)
      if (json !== null) {
        const credentials = JSON.parse(json)
        if (credentials !== null) {
          this.setState({
            isLoggedIn: true,
            server: credentials.server,
            username: credentials.username,
            password: credentials.password,
          });
        }
      }
    } catch (e) {
      console.log('Failed to load credentials.')
      console.log(e);
    }
  }

  saveCredentials = async (credentials) => {
    const json = JSON.stringify(credentials);
    if (json) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, json)
        this.setState({ isLoggedIn: true })
      } catch (e) {
        console.error('Failed to save credentials.')
      }
    }
  }

  clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
      this.setState({ isLoggedIn: false })
    } catch (e) {
      console.error('Failed to clear credentials.')
    }
  }


  render() {
    this.loadCredentials();
    if (!this.state.isLoggedIn) {
      return <Login
        onLoginPress={(credentials) => this.saveCredentials(credentials)}
      />
    } else {
      return <App
        onLogoutPress={() => this.clearCredentials()}
        credentials={{
          server: this.state.server,
          username: this.state.username,
          password: this.state.password,
        }}
      />
    }
  }
}
