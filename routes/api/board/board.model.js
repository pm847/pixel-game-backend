'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

let BoardSchema = new Schema({
  board: {
    width: { type: Number, },
    height: { type: Number, },
  },
  round: { type: Number, },
  players: [{
    id: { type: Schema.Types.ObjectId },
    name: { type: String, },
    x: { type: Number, },
    y: { type: Number, },
  }],
  goals: [{
    x: { type: Number, },
    y: { type: Number, },
    is_achieved: { type: Boolean, }
  }],
  origin: {
    x: { type: Number, },
    y: { type: Number, },
  }
});

/**
 * @returns Promise
 */
BoardSchema.statics.createBoardWithOnePlayer = function(playerName) {
  let boardId = new ObjectId();
  let playerId = new ObjectId();
  return this.create({
    _id: boardId,
    board: {
      width: 40,
      height: 40
    },
    players: [{
      id: playerId,
      name: playerName,
      x: 5,
      y: 5
    }],
    goals: [{
      x: 10,
      y: 20,
      is_achieved: false
    }]
  })
  .then(() => ({ playerId: playerId.toString(), boardId: boardId.toString() }));
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = exports = Board;


