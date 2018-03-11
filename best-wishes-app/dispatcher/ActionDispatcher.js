'use strict';

import { Promise } from 'es6-promise';
import assign from 'object-assign';

var callbacks = [];
var promises = [];

var ActionDispatcher = assign({}, Object.prototype, {
  register(callback) {
    callbacks.push(callback);
  },

  dispatch: function(payload) {
    var resolves = [];
    var rejects = [];
    promises = callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject) {
        resolves[i] = resolve;
        rejects[i] = reject;
      });
    });
    callbacks.forEach(function(callback, i) {
      Promise.resolve(callback(payload)).then(function() {
        resolves[i](payload);
      }, function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'));
      });
    });
    promises = [];
  }
});

module.exports = ActionDispatcher;
