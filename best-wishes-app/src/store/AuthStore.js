'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import Common from '../common/Common';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const EVENT = "event";

var auth = {};

// internal storage
var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    // in milli-sec
    defaultExpires: 1000 * 3600 * 24,
    // cache data in the memory. default is true.
    enableCache: true,
    sync : {
    }
})

var Store = assign({}, EventEmitter.prototype, {

  saveAuthToken(tokenInfo) {
    storage.save({
      key: 'google-auth-token',
      id: '',
      data: tokenInfo
    });

    auth = {isLogin: true, picUrl: tokenInfo.photo, name: tokenInfo.name};

    this.emitChange();
  },

  loadAuthToken() {
    storage.load({
      key: 'google-auth-token',
      id: '',
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      console.log("-------->: "+ret);

      auth = {isLogin: true, picUrl: ret.photo, name: ret.name};
      this.emitChange();
    }).catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
            break;
        case 'ExpiredError':
            break;
      }
    });
  },

  deleteAuthToken(provider) {
    storage.remove({
      key: provider,
      id: ''
    });

    auth = {isLogin: false};

    this.emitChange();
  },

  getAuthInfo() {
    return auth;
  },

  emitChange() {
    this.emit(EVENT);
  },

  addChangeListener(callback) {
    this.on(EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(EVENT, callback);
  }
});

ActionDispatcher.register(function(action) {
  switch (action.type) {
    case Common.ACT_LOAD_AUTH_TOKEN:
      Store.loadAuthToken();
      break;
    case Common.ACT_SAVE_AUTH_TOKEN:
      Store.saveAuthToken(action.tokenInfo);
      break;
    case Common.ACT_DELETE_AUTH_TOKEN:
      Store.deleteAuthToken(action.provider);
      break;
    default:
      console.log("Unknown action for AuthStore: " + action.type);
  }
});

module.exports = Store;
