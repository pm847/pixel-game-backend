'use strict';

const assert = require('assert');

const Board = require('../board/board.model');
const User = require('./user.model');

const controller = {};

controller.newPlayer = (req, res) => {
  const playerId = User.getUniqueId();
  Board.findAvailableBoard()
  .then((boardId) => {
    if (boardId) {
      return Board.insertNewPlayer(boardId, playerId, req.body.name)
      .then(() => {
        res.json({userId: playerId, boardId: boardId});
      });
    } else {
      return Board.createBoardWithOnePlayer(playerId, req.body.name)
      .then((boardId) => {
        res.json({userId: playerId, boardId: boardId});
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
};

controller.removePlayer = (req, res) => {
  assert(req.query.user_id, 'missing user_id');
  assert(/^[0-9a-fA-F]{24}$/.test(req.query.user_id), 'invalid user_id');
  assert(req.query.board_id, 'missing board_id');
  assert(/^[0-9a-fA-F]{24}$/.test(req.query.board_id), 'invalid board_id');
  Board.removePlayer(req.query.board_id, req.query.user_id)
  .then(() => {
    return res.status(204).send();
  });
};

module.exports = exports = controller;