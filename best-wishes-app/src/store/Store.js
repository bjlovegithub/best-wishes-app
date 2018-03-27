'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import Common from '../common/Common';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const AUTH_EVENT = "auth_event";
const WISH_EVENT = "wish_event";
const MYWISH_LOADED_EVENT = "mywish_loaded_event";

var auth = {};

// map to save data for wishes
var wishMap = {};

var myWish = [];

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

  fetchWish(id) {
    if (wishMap[id] === undefined) {
      getData(id);
    }
  },

  getWish(id) {
    return wishMap[id];
  },

  saveAuthToken(tokenInfo) {
    storage.save({
      key: 'google-auth-token',
      id: '',
      data: tokenInfo
    });

    auth = {
      isLogin: true, picUrl: tokenInfo.photo,
      name: tokenInfo.name, user_id: tokenInfo.id
    };

    this.emitChange(AUTH_EVENT);
  },

  loadAuthToken() {
    storage.load({
      key: 'google-auth-token',
      id: '',
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      auth = {isLogin: true, picUrl: ret.photo, name: ret.name};
      this.emitChange(AUTH_EVENT);
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

    this.emitChange(AUTH_EVENT);
  },

  getAuthInfo() {
    return auth;
  },

  loadMyWish() {
    loadMyWish();
  },

  getMyWish() {
    return {'wish': myWish}
  },

  emitChange(eventType) {
    this.emit(eventType);
  },

  addChangeListener(callbackInfo) {
    this.on(callbackInfo.type, callbackInfo.callback);
  },

  removeChangeListener(callbackInfo) {
    this.removeListener(callbackInfo.type, callbackInfo.callback);
  },
});

async function getData(id) {
  try {
    const response = await fetch(
      'http://localhost:9999/wish/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    wishMap[id] = { wish: data.wish, thumbs: data.thumbs, sid: data.sid };

    Store.emitChange(WISH_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function updateThumbs(id) {
  try {
    const sid = wishMap[id].sid;

    const response = await fetch(
      'http://localhost:9999/wish/' + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
        body: JSON.stringify({ 'sid': sid, 'thumbs': wishMap[id].thumbs })
      }
    );
    await response.json();

    if (response.ok) {
      Store.emitChange(WISH_EVENT);
    }
    else {
      console.log("Update thumbs failed: "+sid);
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMyWish() {
  try {
    const response = await fetch(
      'http://localhost:9999/my_wish/' + auth.user_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    myWish = data;

    Store.emitChange(MYWISH_LOADED_EVENT);
  } catch (error) {
    console.error(error);
  }
}

ActionDispatcher.register(function(action) {
  switch (action.type) {
    case Common.ACT_THUMB_UP:
      const wishId = action.wishId;
      if (wishMap[wishId] === undefined) {
        // no wish loaded yet, do nothing.
      }
      else {
        wishMap[wishId].thumbs += 1;

        updateThumbs(wishId);
      }
      break;
    case Common.ACT_LOAD_AUTH_TOKEN:
      Store.loadAuthToken();
      break;
    case Common.ACT_SAVE_AUTH_TOKEN:
      Store.saveAuthToken(action.tokenInfo);
      break;
    case Common.ACT_DELETE_AUTH_TOKEN:
      Store.deleteAuthToken(action.provider);
      break;
    case Common.ACT_LOAD_MY_WISH:
      Store.loadMyWish(action.provider);
      break;
    default:
      console.log("Unknown action for AuthStore: " + action.type);
  }
});

module.exports = Store;
