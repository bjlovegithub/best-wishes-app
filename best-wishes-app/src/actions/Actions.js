'use strict';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import ActionType from '../common/ActionType';

var Actions = {

    thumbUp: function(wishId) {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_THUMB_UP,
            wishId: wishId
        });
    },

    saveAuthToken: function(authToken, provider) {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_SAVE_AUTH_TOKEN,
            tokenInfo: authToken,
            provider: provider,
        });
    },

    deleteAuthToken: function(provider) {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_DELETE_AUTH_TOKEN,
            provider: provider,
        });
    },

    loadAuthToken: function() {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_LOAD_AUTH_TOKEN,
        });
    },

    loadMyWish: function() {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_LOAD_MY_WISH,
        });
    },

    submitWish: function(wish) {
        ActionDispatcher.dispatch({
            type: ActionType.ACT_SUBMIT_MY_WISH,
            wish: wish,
        });
    },
};

module.exports = Actions;
