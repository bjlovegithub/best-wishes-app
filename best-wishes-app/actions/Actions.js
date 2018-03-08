'use strict';

import Dispatcher from '../dispatcher/Dispatcher';
import Commons from '../common/Commons';

var Actions = {

  thumbUp: function(wishId) {
    AppDispatcher.dispatch({
      type: Commons.ACT_THUMB_UP,
      wishId: wishId
    });
  }
};

module.exports = Actions;
