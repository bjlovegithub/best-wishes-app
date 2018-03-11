'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

const EVENT = "event";

var wishMap = {}

var Store = assign({}, EventEmitter.prototype, {

  async getData(id) {
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

      this.emitChange();
    } catch (error) {
      console.error(error);
    }
  },

  fetchWish(id) {
    if (wishMap[id] === undefined) {
      this.getData(id);
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
  },
});

module.exports = Store;
