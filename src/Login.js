import React, { Component } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator } from 'react-native';
import { Buffer } from 'buffer';

export default class Login extends Component {
  state = {
    server: "http://mars.imagic.ch:3171/rest",
    username: null,
    password: null,
    isLoggingIn: false,
    error: false,
  }

  onChangeServer = (server) => {
    const serverRegex = new RegExp('^https?://', 'i');
    const ok = serverRegex.exec(server);
    if (ok) {
      this.setState({ server });
      this.setState({ error: false });
    } else {
      this.setState({ error: 'wrong server URL format' });
    }
  }

  onChangeUser = (username) => this.setState({ username });

  onChangePassword = (password) => this.setState({ password })

  logOn = async () => {
    const { server, username, password } = this.state;

    this.setState({ isLoggingIn: true, error: false })
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
        this.setState({ isLoggingIn: false });
        this.props.onLoginPress({
          'server': server,
          'username': username,
          'password': password,
        });
      } else {
        this.setState({ isLoggingIn: false, error: "Login Failed (Status " + res.status + ")" })
      }
    } catch (e) {
      this.setState({ isLoggingIn: false, error: e.toString() })
    }
  }

  render() {
    const { isLoggingIn, error, server, username, password } = this.state;

    return (
      <View>
        <Text>Login:</Text>
        <TextInput
          placeholder="Server"
          defaultValue={server}
          autoCorrect={false}
          editable={!isLoggingIn}
          onChangeText={this.onChangeServer} />
        <TextInput
          placeholder="Username"
          autoCorrect={false}
          editable={!isLoggingIn}
          onChangeText={this.onChangeUser} />
        <TextInput
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          editable={!isLoggingIn}
          onChangeText={this.onChangePassword} />
        <Button
          disabled={isLoggingIn || !server || !username || !password}
          onPress={this.logOn}
          title="go"
        />
        <Text>{error}</Text>
        <View>
          <ActivityIndicator animating={isLoggingIn} />
        </View>
      </View>
    )
  }
}
