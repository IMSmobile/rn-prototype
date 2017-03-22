import React, { Component } from 'react';
import { View, Text, Picker, Item } from 'native-base';
import ImsRequest from './ImsRequest.js';
import ImsModelForms from './ImsModelForms.js';

export default class ImsModelFieldBrowser extends Component {

  state = {
    models: null,
    modelPicked: null,
    tables: null,
    loading: false,
  }

  componentWillMount = async () => {
    try {
      const models = await ImsRequest.getModels(this.props.credentials);
      this.setState({ models });
    } catch (e) {
      console.log(e);
    }
  }

  onModelPicked = async (model) => {
    try {
      this.setState({'loading': true});
      const tables = await ImsRequest.getModelFields(this.props.credentials, model);
      this.setState({
        'loading': false,
        'modelPicked': model,
        'tables': tables
      })
    } catch (e) {
      this.setState({'loading': false});
      console.log(e);
    }
  }

  render() {
    if (this.state.models === null || this.state.loading) {
      return (
        <Text>please wait...</Text>
      )
    } else {
      var modelList = [];
      this.state.models.forEach((model) => {
        modelList.push(
          <Item label={model.name} value={model.dataHref} key={model.dataHref} />
        )
      })
      return (
        <View>
          <Picker
            onValueChange={this.onModelPicked.bind(this)}
            selectedValue={this.state.modelPicked}
          >
            {modelList}
          </Picker>
          {this.state.tables && <ImsModelForms tables={this.state.tables} />}
        </View>
      )
    }
  }
}
