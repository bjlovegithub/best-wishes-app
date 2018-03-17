'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

import ActionDispatcher from '../dispatcher/ActionDispatcher'
import Common from '../common/Common'

const EVENT = "event";

var wishMap = {};

var Store = assign({}, EventEmitter.prototype, {
  fetchWish(id) {
    if (wishMap[id] === undefined) {
      getData(id);
    }
  },

  getWish(id) {
    return wishMap[id];
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

    Store.emitChange();
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
      Store.emitChange();
    }
    else {
      console.log("Update thumbs failed: "+sid);
    }
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
    default:
      console.log("Unknown action: " + action.type);
  }
});

module.exports = Store;
