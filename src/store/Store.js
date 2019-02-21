'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import ActionType from '../common/ActionType';
import Events from '../common/Events';
import ErrorType from '../common/ErrorType';

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var auth = {};

// map to save data for wishes
var wishMap = {};

var myWish = [];

// the wish from my wish list which will be updated
var myWishForUpdate = null;

// keep the info from latest action
var lastActionInfo = {};

// track the wish where its thumbs have been updated.
var thumbedWishId = null;

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
});

const SERVER = "https://192.168.0.6";

var Store = assign({}, EventEmitter.prototype, {

  fetchBoardWish() {
    fetchBoardWish();
  },

  getBoardWish() {
    return wishMap;
    const arr = [];
    for (var prop in wishMap) {
      if (wishMap.hasOwnProperty(prop)) {
        arr.push(wishMap[prop]);
      }
    }    

    return arr;
  },

  fetchWish(id) {
    if (wishMap[id] === undefined) {
      getData(id);
    }
  },

  getWish(id) {
    return wishMap[id];
  },

  saveAuthToken(tokenInfo) {
    // the input parameter tokenInfo contains:
    //   - googleIdVerified
    //   - googleUserInfo: response from google api
    //   - jwt: jwt from backend server

    storage.save({
      key: 'google-auth-token',
      id: '',
      data: tokenInfo
    });

    auth = {
      isLogin: true, picUrl: tokenInfo.googleUserInfo.user.photo,
      name: tokenInfo.googleUserInfo.user.name,
      user_email: tokenInfo.googleUserInfo.user.email,
      token: tokenInfo.googleUserInfo.accessToken,
      loginFailed: false, jwt: tokenInfo.jwt, user_id: tokenInfo.user_id
    };

    this.emitChange(Events.AUTH_EVENT);
  },

  loginFailed() {
    auth = {
      isLogin: false, loginFailed: true, message: auth.message
    };

    this.emitChange(Events.AUTH_EVENT);
  },

  loadAuthToken() {
    storage.load({
      key: 'google-auth-token',
      id: '',
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      auth = {
        isLogin: true, picUrl: ret.googleUserInfo.user.photo, user_id: ret.user_id,
        name: ret.googleUserInfo.user.name, token: ret.accessToken, jwt: ret.jwt,
        user_email: ret.googleUserInfo.user.email,
      };
      this.emitChange(Events.AUTH_EVENT);
    }).catch(err => {
      switch (err.name) {
      case 'NotFoundError':
        break;
      case 'ExpiredError':
        break;
      default:
        console.warn(err.message);
      }
      auth = {
        isLogin: false,
      };
      this.emitChange(Events.AUTH_EVENT);
    });
  },

  deleteAuthToken(provider) {
    storage.remove({
      key: provider,
      id: ''
    });

    auth = {
      isLogin: false
    };

    this.emitChange(Events.AUTH_EVENT);
  },

  getAuthInfo() {
    return auth;
  },

  getLastActionInfo() {
    return lastActionInfo;
  },

  clearLastActionInfo() {
    lastActionInfo = {};
  },

  loadMyWish() {
    loadMyWish();
  },

  submitMyWish(wish) {
    submitMyWish(wish);
  },

  submitFeedback(feedback) {
    submitFeedback(feedback);
  },

  deleteMyWish(wish) {
    deleteMyWish(wish);
  },

  clearWishInEditor() {
    clearWishInEditor();
  },

  confirmCancel() {
    Store.emitChange(Events.CONFIRM_CANCEL_EVENT);
  },

  getMyWish() {
    return {'wish': myWish};
  },

  setMyWishForUpdate(wish) {
    myWishForUpdate = wish;
  },

  getMyWishForUpdate(wish) {
    return myWishForUpdate;
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

  verifyGoogleIdToken(token) {
    verifyGoogleIdToken(token);
  },

  getThumbedWishId() {
    return thumbedWishId;
  },
});

async function fetchBoardWish() {
  try {
    const response = await fetch(
      SERVER + '/board_wish', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    const data = await response.json();
    data.forEach(w => {
      w.key = w.id;
      wishMap[w.id] = w;
    });

    lastActionInfo = {};
    
    Store.emitChange(Events.BOARD_WISH_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
  }
}

async function getData(id) {
  try {
    const response = await fetch(
      SERVER + '/wish/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,
        }
      }
    );
    const data = await response.json();
    wishMap[id] = { wish: data.wish, thumbs: data.thumbs, sid: data.sid };

    lastActionInfo = {};

    Store.emitChange(Events.WISH_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
  }
}

async function updateThumbs(id) {
  try {
    const response = await fetch(
      SERVER + '/wish/' + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,          
        },
        body: JSON.stringify({id: wishMap[id], user_id: auth.user_id})
      }
    );
    
    const m = await response.json();

    if (response.ok) {
      lastActionInfo = {};
      wishMap[id].thumbs += 1;
    }
    else {
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(response.status)};
    }
    Store.emitChange(Events.THUMB_UP_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
  }
}

async function loadMyWish() {
  try {
    const response = await fetch(
      SERVER + '/my_wish/' + auth.user_id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,          
        }
      }
    );

    const data = await response.json();    

    if (response.ok) {
      myWish = data;
      lastActionInfo = {};

      Store.emitChange(Events.MYWISH_LOADED_EVENT);
    }
    else {
      myWish = {wish: []};
      lastActionInfo = {error: data.message, failed: true, type: getErrorType(response.status)};
      Store.emitChange(Events.MYWISH_LOADED_EVENT);
    }
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
    Store.emitChange(Events.MYWISH_LOADED_EVENT);
  }
}

async function submitMyWish(wish) {
  try {
    const response = await fetch(
      SERVER + '/wish/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,
        },
        body: JSON.stringify(wish),
      }
    );

    const m = await response.json();    

    if (response.ok) {
      lastActionInfo = {};
    } else {
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(response.status)};
    }

    Store.emitChange(Events.MYWISH_SAVED_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
    Store.emitChange(Events.MYWISH_SAVED_EVENT);
  }
}

async function submitFeedback(feedback) {
  try {
    const response = await fetch(
      SERVER + '/feedback/' , {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,
        },
        body: JSON.stringify(feedback),
      }
    );
    const m = await response.json();

    if (response.ok) {
      lastActionInfo = {};
    } else {
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(response.status)};
    }
    Store.emitChange(Events.FEEDBACK_SENT_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
    Store.emitChange(Events.FEEDBACK_SENT_EVENT);
  }
}

async function deleteMyWish(wish) {
  try {
    const response = await fetch(
      SERVER + '/wish/' + wish.id , {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
          'User-Id': auth.user_id,
        },
      }
    );

    const m = await response.json();
  
    if (response.ok) {
      myWish = myWish.filter(i => i.id !== wish.id);
      lastActionInfo = {};
    } else {
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(response.status)};
    }

    Store.emitChange(Events.MYWISH_DELETED_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
  }
}

async function verifyGoogleIdToken(userInfo) {
  const idToken = userInfo.idToken;
  try {
    const response = await fetch(
      SERVER + '/verify_google_id_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idToken: idToken}),
      }
    );

    const body = await response.json();

    auth.googleIdVerified = response.status == 200;
    auth.googleUserInfo = userInfo;
    auth.jwt = body.token;
    auth.user_id = body.user_id;
    auth.message = body['message'];

    lastActionInfo = {};

    Store.emitChange(Events.GOOGLE_ID_VERIFIED_EVENT);
  } catch (error) {
    console.log(error);
    lastActionInfo = {error: error.message, failed: true, type: getErrorType(0)};
  }
}

function clearWishInEditor() {
  myWishForUpdate = undefined;
}

function formBearHeader(jwt) {
  return "Bearer " + jwt;
}

function getErrorType(code) {
  switch(code) {
  case 400:
    return ErrorType.ERR_BAD_REQUEST;
  case 401:
    return ErrorType.ERR_AUTH_FAILED;
  default:
    return ErrorType.ERR_UNKNOWN;
  }
}

ActionDispatcher.register(function(action) {
  switch (action.type) {
  case ActionType.ACT_FETCH_BOARD_WISH:
    Store.fetchBoardWish();
    break;
  case ActionType.ACT_THUMB_UP:
    const wishId = action.wishId;
    if (wishMap[wishId] === undefined) {
      // no wish loaded yet, do nothing.
    }
    else {
      thumbedWishId = wishId;
      updateThumbs(wishId);
    }
    break;
  case ActionType.ACT_LOAD_AUTH_TOKEN:
    Store.loadAuthToken();
    break;
  case ActionType.ACT_SAVE_AUTH_TOKEN:
    Store.saveAuthToken(action.tokenInfo);
    break;
  case ActionType.ACT_DELETE_AUTH_TOKEN:
    Store.deleteAuthToken(action.provider);
    break;
  case ActionType.ACT_LOAD_MY_WISH:
    Store.loadMyWish(action.provider);
    break;
  case ActionType.ACT_SUBMIT_MY_WISH:
    Store.submitMyWish(action.wish);
    break;
  case ActionType.ACT_SUBMIT_FEEDBACK:
    Store.submitFeedback(action.feedback);
    break;
  case ActionType.ACT_DELETE_MY_WISH:
    Store.deleteMyWish(action.wish);
    break;
  case ActionType.ACT_CLEAR_WISH_IN_EDITOR:
    Store.clearWishInEditor();
    break;
  case ActionType.ACT_CONFIRM_CANCEL_IN_EDITOR:
    Store.confirmCancel();
    break;
  case ActionType.ACT_VERIFY_GOOGLE_ID_TOKEN:
    Store.verifyGoogleIdToken(action.idToken);
    break;
  case ActionType.ACT_LOGIN_FAILED:
    Store.loginFailed();
    break;
  default:
    console.log("Unknown action for AuthStore: " + action.type);
  }
});

module.exports = Store;
