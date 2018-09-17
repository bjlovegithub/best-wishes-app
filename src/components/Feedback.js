'use strict';

import React from 'react';
import {
  Text, View, Image, TouchableOpacity, ImageBackground, TextInput
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
import {getDate} from '../common/Util';

import styles from '../styles/Feedback';

const ThumbupBackground = require('../../assets/botton_background.jpg');
const ThumbupLogo = require('../../assets/thumbs-up-sign_1f44d.png');

const countryOptions = [
  {label: 'Denmark', value: 'DK'},
  {label: 'Germany', value: 'DE'},
  {label: 'United State', value: 'US'}
];

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: "", email: "", message: "", isSending: false};

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const resp = Store.getFeedbackSentResp();
    console.log(resp);
    this.setState({isSending: false});
  }

  handleClick() {
    Actions.thumbUp(this.state.id);
  }

  onSubmit() {
    this.setState({isSending: true});

    Actions.submitFeedback(this.state);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <View style={styles.backgroundStyle}>
        <Form>
          <FieldsContainer>
            <Fieldset label="Contact details">
              <FormGroup>
                <Label>Name</Label>
                <Input placeholder="Esben" disabled={this.state.isSending} onChangeText={(text) => {
                    this.setState({
                      name: text,
                    });
                  }} />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input placeholder="esbenspetersen@gmail.com" disabled={this.state.isSending} onChangeText={(text) => {
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
              disabled={this.state.isSending}
              />
          </FieldsContainer>
          <ActionsContainer>
            <Button icon="md-checkmark" iconPlacement="right" onPress={this.onSubmit} disabled={this.state.isSending}>Send</Button>
          </ActionsContainer>
        </Form>
      </View>
    );
  }
}

module.exports = Feedback;
