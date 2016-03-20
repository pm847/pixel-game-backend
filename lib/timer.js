'use strict';

const timer = {};

timer.nextTenSeconds = function(date) {
  let newDate = new Date(date);
  // actually, it's 5 sec
  newDate.setSeconds(newDate.getSeconds() + 5);
  return newDate;
};

module.exports = exports = timer;