'use strict';

import ActionDispatcher from '../dispatcher/ActionDispatcher';
import ActionType from '../common/ActionType';

var Actions = {

  fetchBoardWish: function() {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_FETCH_BOARD_WISH,
    });
  },

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

  saveShowAppIntroSliderFlag: function(flag) {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_SAVE_APP_INTRO_SLIDER_FLAG,
      flag: flag,
    });
  },

  loadShowAppIntroSliderFlag: function() {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_LOAD_APP_INTRO_SLIDER_FLAG,
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

  submitFeedback: function(feedback) {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_SUBMIT_FEEDBACK,
      feedback: feedback,
    });
  },

  deleteMyWish: function(wish) {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_DELETE_MY_WISH,
      wish: wish,
    });
  },

  clearWishInEditor: function() {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_CLEAR_WISH_IN_EDITOR,
    });
  },

  confirmCancelEdit: function() {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_CONFIRM_CANCEL_IN_EDITOR,
    });
  },

  verifyGoogleIdToken: function(token) {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_VERIFY_GOOGLE_ID_TOKEN,
      idToken: token,
    });
  },

  loginFailed: function() {
    ActionDispatcher.dispatch({
      type: ActionType.ACT_LOGIN_FAILED,
    });
  }
};

module.exports = Actions;
