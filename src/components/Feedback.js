'use strict';

import React from 'react';
import {
  Text, View, Image, TouchableOpacity, ImageBackground, TextInput, Alert
} from 'react-native';

import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
  Input,
  Switch,
} from 'react-native-clean-form';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {getDate, checkRequestError} from '../common/Util';

import styles from '../styles/Feedback';

const countryOptions = [
  {label: 'Denmark', value: 'DK'},
  {label: 'Germany', value: 'DE'},
  {label: 'United State', value: 'US'}
];

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    const auth = Store.getAuthInfo();
    this.state = {
      name: auth.name, email: auth.user_email,
      message: "", isSending: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener({
      "type": Events.FEEDBACK_SENT_EVENT, "callback": this.onChange
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      "type": Events.FEEDBACK_SENT_EVENT, "callback": this.onChange
    });
  }

  onChange() {
    const status = Store.getLastActionInfo();
    if (status.failed != true) {
      Alert.alert(
        'Info',
        'Thanks for your feedback :)',
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      );
    }
    this.setState({isSending: false});
  }

  onSubmit() {
    this.setState({isSending: true});
  
    Actions.submitFeedback(this.state);
  }

  render() {
    checkRequestError(this);
    
    const { handleSubmit, submitting } = this.props;

    var button;
    if (this.state.isSending)
      button = <Button icon="md-time" iconPlacement="right" onPress={this.onSubmit} disabled={this.state.isSending}>Sending</Button>;
    else
      button = <Button icon="md-checkmark" iconPlacement="right" onPress={this.onSubmit} disabled={this.state.isSending}>Send</Button>;
    
    return (
      <View style={styles.backgroundStyle}>
        <Form>
          <FieldsContainer>
            <Fieldset label="Contact details">
              <FormGroup>
                <Label>Name</Label>
                <Input placeholder={this.state.name} editable={!this.state.isSending} onChangeText={(text) => {
                    this.setState({
                      name: text,
                    });
                  }} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input placeholder={this.state.email} editable={!this.state.isSending} onChangeText={(text) => {
                    this.setState({
                      email: text,
                    });
                  }} />
              </FormGroup>
            </Fieldset>
            <Fieldset label="Message" last>
            </Fieldset>
            <TextInput
               multiline
               maxLength={400}
               onChangeText={(text) => {
                 this.setState({
                   message: text,
                 });
                }
              }
              style={{flex: 8, marginLeft: 25, marginRight: 25, height: 40}}
              editable={!this.state.isSending}
              />
          </FieldsContainer>
          <ActionsContainer>
            {button}
          </ActionsContainer>
        </Form>
      </View>
    );
  }
}

module.exports = Feedback;
