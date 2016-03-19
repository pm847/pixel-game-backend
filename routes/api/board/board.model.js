'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const PlayerScheme = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, },
  x: { type: Number, },
  y: { type: Number, },
  _nextMove: {
    x: { type: Number, },
    y: { type: Number, },
  },
}, { _id : false });

const GoalSchema = new Schema({
  x: { type: Number, },
  y: { type: Number, },
  is_achieved: { type: Boolean, }
}, { _id : false });

let BoardSchema = new Schema({
  board: {
    width: { type: Number, default: 100, },
    height: { type: Number, default: 100, },
  },
  round: { type: Number, default: 0, },
  players: [PlayerScheme],
  numOfPlayers: { type: Number, default: 0, },
  goals: [GoalSchema],
  origin: {
    x: { type: Number, default: 5 },
    y: { type: Number, default: 5 },
  },
  status: {
    type: String, default: 'ongoing', enum: ['ongoing', 'lose', 'win'],
  }
});

/**
 * @returns Promise
 */
BoardSchema.statics.createBoardWithOnePlayer = function(playerIdHexString, playerName) {
  let boardId = new ObjectId();
  let playerId = new ObjectId(playerIdHexString);
  return this.create({
    _id: boardId,
    board: {
      width: 100,
      height: 100
    },
    players: [{
      id: playerId,
      name: playerName,
      x: 5,
      y: 5
    }],
    numOfPlayers: 1,
    goals: [{
      x: 10,
      y: 20,
      is_achieved: false
    }]
  })
  .then(() => (boardId.toString()));
};

/**
 * @returns Promise
 */
BoardSchema.statics.findAvailableBoard = function() {
  return this.findOne({
    numOfPlayers: {
      $lt: 20
    }
  })
  .then((board) => {
    if (board)
      return board._id.toString();
    else
      return null;
  });
};

BoardSchema.statics.insertNewPlayer = function(boardIdHexString, playerIdHexString, playerName) {
  let boardId = new ObjectId(boardIdHexString);
  let playerId = new ObjectId(playerIdHexString);
  return this.update({
    _id: boardId
  }, {
    $push: {
      players: {
        id: playerId,
        name: playerName,
        x: 5,
        y: 5
      }
    },
    $inc: {
      numOfPlayers: 1
    }
  });
};

/**
 * @param {string} boardIdHexString
 * @param {string} playerIdHexString
 * @param {number} nextRound
 * @param {number} nextX
 * @param {number} nextY
 */
BoardSchema.statics.updateNextMove = function(boardIdHexString, playerIdHexString,
  nextRound, nextX, nextY) {
  let boardId = new ObjectId(boardIdHexString);
  let playerId = new ObjectId(playerIdHexString);

  return this.update({
    _id: boardId,
    'players.id': playerId,
    round: nextRound - 1
  }, {
    $set: {
      'players.$._nextMove': {
        x: nextX,
        y: nextY,
      }
    },
  });
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = exports = Board;


