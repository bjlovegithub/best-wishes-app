'use strict';

export function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
  var hours = date.getFullYear();
  var minutes = "0" + (date.getMonth() + 1);
  var seconds = "0" + date.getDate();
  return hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2);
}
