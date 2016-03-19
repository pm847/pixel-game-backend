'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const PlayerScheme = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, },
  x: { type: Number, },
  y: { type: Number, },
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
BoardSchema.statics.createBoardWithOnePlayer = function(playerName) {
  let boardId = new ObjectId();
  let playerId = new ObjectId();
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


