import React, { Component } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Buffer } from 'buffer';

export default class Login extends Component {
  state = {
    server: "http://mars.imagic.ch:3171/rest",
    username: null,
    password: null,
    isLoggingIn: false,
    status: false,
  }

  onChangeServer = (server) => {
    const serverRegex = new RegExp('^https?://', 'i');
    const ok = serverRegex.exec(server);
    if (ok) {
      this.setState({ server });
      this.setState({ status: false });
    } else {
      this.setState({ status: 'wrong server URL format' });
    }
  }

  onChangeUser = (username) => this.setState({ username });

  onChangePassword = (password) => this.setState({ password })

  logOn = async () => {
    const { server, username, password } = this.state;

    this.setState({ isLoggingIn: true, status: null })
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
        this.setState({ isLoggingIn: false, status: "Login Failed (Status " + res.status + ")" })
      }
    } catch (e) {
      this.setState({ isLoggingIn: false, status: e.toString() })
    }
  }

  render() {
    const { isLoggingIn, status, server, username, password } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./logo.png')}
          />
          <Text style={styles.title}>ims Prototype built with React Native</Text>
        </View>
        { isLoggingIn &&
          <ActivityIndicator
            animating={isLoggingIn}
            color='rgba(255,255,255,0.7)'
            size='large'
          />
        }
        { status && 
          <Text style={styles.status}>{status}</Text>
        }
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Server"
            defaultValue={server}
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='next'
            editable={!isLoggingIn}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholderTextColor='rgba(255,255,255,0.7)'
            onSubmitEditing={() => this.usernameInput.focus()}
            onChangeText={this.onChangeServer} />
          <TextInput
            placeholder="Username"
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='next'
            editable={!isLoggingIn}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholderTextColor='rgba(255,255,255,0.7)'
            ref={(input) => this.usernameInput = input}
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={this.onChangeUser} />
          <TextInput
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize='none'
            returnKeyType='go'
            secureTextEntry={true}
            editable={!isLoggingIn}
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholderTextColor='rgba(255,255,255,0.7)'
            ref={(input) => this.passwordInput = input}
            onChangeText={this.onChangePassword} />
          <Button
            disabled={isLoggingIn || !server || !username || !password}
            onPress={this.logOn}
            title="Login"
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 140,
    textAlign: 'center',
    opacity: 0.6,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    color: '#FFF',
    paddingHorizontal: 10,
  },
  button: {
    fontWeight: '700',
    color: '#FFF',
  },
  status: {
    color: '#2c3e50',
    backgroundColor: '#e67e22',
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
  }
})