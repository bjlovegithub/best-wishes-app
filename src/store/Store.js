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

var feedbackSentResp = {};

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
      isLogin: false, loginFailed: true,
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
        name: ret.googleUserInfo.user.name, token: ret.accessToken, jwt: ret.jwt
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

  getFeedbackSentResp() {
    return feedbackSentResp;
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
  }
});

async function fetchBoardWish() {
  try {
    const response = await fetch(
      'http://localhost:9999/board_wish', {
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

    Store.emitChange(Events.BOARD_WISH_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function getData(id) {
  try {
    const response = await fetch(
      'http://localhost:9999/wish/' + id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
        }
      }
    );
    const data = await response.json();
    wishMap[id] = { wish: data.wish, thumbs: data.thumbs, sid: data.sid };

    Store.emitChange(Events.WISH_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function updateThumbs(id) {
  try {
    const response = await fetch(
      'http://localhost:9999/wish/' + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(wishMap[id])
      }
    );
    await response.json();

    if (response.ok) {
      Store.emitChange(Events.THUMB_UP_EVENT);
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
          Authorization: formBearHeader(auth.jwt),
        }
      }
    );

    if (response.ok) {
      const data = await response.json();
      myWish = data;
      lastActionInfo = {};

      Store.emitChange(Events.MYWISH_LOADED_EVENT);
    }
    else {
      // TODO - May have to distinguish error types, such as login failed, etc.
      const m = await response.json();
      myWish = {wish: []};
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(m.type)};
      Store.emitChange(Events.MYWISH_LOADED_EVENT);
    }
  } catch (error) {
    console.error(error);
  }
}

async function submitMyWish(wish) {
  console.log(wish);
  try {
    const response = await fetch(
      'http://localhost:9999/wish/', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
        },
        body: JSON.stringify(wish),
      }
    );

    if (response.ok) {
      lastActionInfo = {};
    } else {
      const m = await response.json();
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(m.type)};
    }

    Store.emitChange(Events.MYWISH_SAVED_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function submitFeedback(feedback) {
  try {
    const response = await fetch(
      'http://localhost:9999/feedback/' , {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      }
    );
    const feedbackSentResp = response;

    setTimeout(() => {console.log("feeddddd"); Store.emitChange(Events.FEEDBACK_SENT_EVENT);}, 10000000);    
    // Store.emitChange(Events.FEEDBACK_SENT_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function deleteMyWish(wish) {
  try {
    const response = await fetch(
      'http://localhost:9999/wish/' + wish.id , {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: formBearHeader(auth.jwt),
        },
      }
    );
  
    if (response.ok) {
      myWish = myWish.filter(i => i.id !== wish.id);
    } else {
      const m = await response.json();
      lastActionInfo = {error: m.message, failed: true, type: getErrorType(m.type)};
    }
    
    Store.emitChange(Events.MYWISH_DELETED_EVENT);
  } catch (error) {
    console.error(error);
  }
}

async function verifyGoogleIdToken(userInfo) {
  const idToken = userInfo.idToken;
  try {
    const response = await fetch(
      'http://localhost:9999/verify_google_id_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idToken: idToken}),
      }
    );

    const body = await response.json();
  
    auth.googleIdVerified = response.status == 200 && body.ok == true;
    auth.googleUserInfo = userInfo;
    auth.jwt = body.token;
    auth.user_id = body.user_id;

    Store.emitChange(Events.GOOGLE_ID_VERIFIED_EVENT);
  } catch (error) {
    console.error(error);
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
  case 1:
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
      wishMap[wishId].thumbs += 1;
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
