'use strict';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import Common from '../common/Common';

var Actions = {

  thumbUp: function(wishId) {
    ActionDispatcher.dispatch({
      type: Common.ACT_THUMB_UP,
      wishId: wishId
    });
  }
};

module.exports = Actions;
