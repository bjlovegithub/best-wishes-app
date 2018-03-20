'use strict';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import Common from '../common/Common';

var Actions = {

  thumbUp: function(wishId) {
    ActionDispatcher.dispatch({
      type: Common.ACT_THUMB_UP,
      wishId: wishId
    });
  },

  saveAuthToken: function(authToken, provider) {
    ActionDispatcher.dispatch({
      type: Common.ACT_SAVE_AUTH_TOKEN,
      tokenInfo: authToken,
      provider: provider,
    });
  },

  deleteAuthToken: function(provider) {
    ActionDispatcher.dispatch({
      type: Common.ACT_DELETE_AUTH_TOKEN,
      provider: provider,
    });
  },

  loadAuthToken: function() {
    console.log("xxxxxxxxx")
    ActionDispatcher.dispatch({
      type: Common.ACT_LOAD_AUTH_TOKEN
    });
  },
};

module.exports = Actions;
