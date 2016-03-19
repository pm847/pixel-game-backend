'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const User = {};

/**
 * @returns id in string format
 */
User.getUniqueId = function() {
  let oid = new ObjectId();
  return oid.toString();
};

module.exports = exports = User;
