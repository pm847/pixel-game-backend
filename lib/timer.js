'use strict';

const timer = {};

timer.nextTenSeconds = function(date) {
  let newDate = new Date(date);
  // actually, it's 3 sec!!
  newDate.setSeconds(newDate.getSeconds() + 3);
  return newDate;
};

module.exports = exports = timer;