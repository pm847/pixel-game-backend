'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const timer = require('../../../lib/timer');

const PlayerScheme = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, default: 'Ms. Anonymous'},
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
  },
  _nextRoundDeadline: { type: Date, required: true, },
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
    }],
    _nextRoundDeadline: timer.nextTenSeconds(new Date())
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
    },
    status: 'ongoing'
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


BoardSchema.methods.toTidyObject = function() {
  let result = this.toObject();
  result.id = result._id.toString();
  delete result._id;
  if ('__v' in result)
    delete result.__v;
  result.players = result.players.map((player) => ({
    id: player.id,
    name: player.name,
    x: player.x,
    y: player.y
  }));
  return result;
};

BoardSchema.methods.nextRound = function(players, status) {
  return this.update({
    $set: {
      players: players,
      status: status,
      _nextRoundDeadline: timer.nextTenSeconds(new Date())
    },
    $inc: {
      round: 1
    }
  })
  .exec();
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = exports = Board;


