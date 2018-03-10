'use strict';

import { EventEmitter } from 'events';
import assign from 'object-assign';

var wishMap = {}

var Store = function() {};
Store.prototype = assign({}, EventEmitter.prototype, {

  getData = async (id) => {
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
    } catch (error) {
      console.error(error);
    }
  }

  getWish = (id) => {
    if (wishMap[id] === undefined) {
      getData(id).done();
    }

    return wishMap[id];
  }

}
