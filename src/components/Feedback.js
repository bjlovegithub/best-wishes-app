'use strict';

import React from 'react';
import {
  Text, View, Image, TouchableOpacity, ImageBackground
} from 'react-native';

import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
} from 'react-native-clean-form';
import { Input } from 'react-native-elements';

import Store from '../store/Store';
import Actions from '../actions/Actions';
import Events from '../common/Events';
import {getDate} from '../common/Util';

import styles from '../styles/Wish';

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

    this.state = props.wish;

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener({
      "type": Events.THUMB_UP_EVENT, "callback": this.onChange
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener({
      "type": Events.THUMB_UP_EVENT, "callback": this.onChange
    });
  }

  onChange() {
    this.setState(Store.getWish(this.state.id));
  }

  handleClick() {
    Actions.thumbUp(this.state.id);
  }

  onSubmit() {
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <View>
        <Form>
          <FieldsContainer>
            <Fieldset label="Contact details">
              <Input name="first_name" label="First name" placeholder="John" />
              <Input name="last_name" label="Last name" placeholder="Doe" />
              <Input name="email" label="Email" placeholder="something@domain.com" keyboardType="email-address" returnKeyType="next" blurOnSubmit={false} />
              <Input name="telephone" label="Phone" placeholder="+45 88 88 88 88" dataDetectorTypes="phoneNumber" keyboardType="phone-pad" />
              <Input name="message" label="Message" placeholder="" multiline={true} numberOfLines={5}  inlineLabel={false} />
            </Fieldset>
            <Fieldset label="Shipping details" last>
              <Input name="address" label="Address" placeholder="Hejrevej 33" />
              <Input name="city" label="City" placeholder="Copenhagen" />
              <Input name="zip" label="ZIP Code" placeholder="2400" />
            </Fieldset>
          </FieldsContainer>
          <ActionsContainer>
            <Button icon="md-checkmark" iconPlacement="right" onPress={this.onSubmit} submitting={true}>Save</Button>
          </ActionsContainer>
        </Form>
      </View>
    );
  }
}

module.exports = Feedback;
