import React, { Component } from 'react';
import { Text, Picker, Form, Item, Input, Switch } from 'native-base';
import ImsRequest from './ImsRequest.js';

export default class ImsModelForms extends Component {

  render() {
    const tables = this.props.tables;
    if (tables === null || tables.length < 1) {
      return (
        <Text>please wait</Text>
      )
    } else {
      let tableList = [];
      for (let table of tables) {
        tableList.push(
          <Text key={table.identifierField}>{table.name}</Text>
        )
        table.fields.filter(field => field.writable === true && field.type !== 'PARENTREFERENCE').map(field => {
          let key = table.identifierField + field.name;
          if (field.type === "STRING") {
            tableList.push(
              <Item key={key}>
                <Input placeholder={field.name} />
              </Item>
            )
          } else if (field.type === "BOOLEAN") {
            tableList.push(
              <Item key={key}>
                <Text>{field.name}</Text>
                <Switch key={key} value={false} />
              </Item>
            )

          }
        })
      }
      return (
        <Form>
          {tableList}
        </Form>
      )
    }
  }
}
