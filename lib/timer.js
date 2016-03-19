'use strict';

const timer = {};

timer.nextTenSeconds = function(date) {
  let newDate = new Date(date);
  newDate.setSeconds(newDate.getSeconds() + 10);
  return newDate;
};

module.exports = exports = timer;