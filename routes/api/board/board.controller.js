'use strict';

const assert = require('assert');

const Board = require('../board/board.model');
const mockBoard = require('./mock.json');
const computeResult = require('../../../lib/game');

const controller = {};

controller.getBoard = (req, res) => {
  if (/^[0-9a-fA-F]{24}$/.test(req.query.board_id)){
    Board.findById(req.query.board_id)
    .then((result) => {
      if (result) {
        result = result.toTidyObject();
        let afterCompute = computeResult(result);
        console.error(afterCompute);
        return res.status(200).json(afterCompute);
      } else {
        return res.status(200).json(mockBoard);
      }
    });
  } else {
    return res.status(200).json(mockBoard);
  }
};

controller.nextMove = (req, res) => {
  assert(req.body.userId, 'missing userId');
  assert(/^[0-9a-fA-F]{24}$/.test(req.body.userId), 'invalid userId');
  assert(req.body.boardId, 'missing boardId');
  assert(/^[0-9a-fA-F]{24}$/.test(req.body.boardId), 'invalid boardId');
  assert(req.body.nextRound, 'missing nextRound');
  assert(req.body.nextMove, 'missing nextMove');
  assert(req.body.nextMove.x, 'missing nextMove.x');
  assert(req.body.nextMove.y, 'missing nextMove.y');

  Board.updateNextMove(req.body.boardId, req.body.userId,
    req.body.nextRound, req.body.nextMove.x, req.body.nextMove.y)
  .then((result) => {
    if (result && 1 === result.nModified) {
      return res.sendStatus(204);  
    } else {
      return res.status(400).send('something wrong happens...');
    }
  });
};

module.exports = exports = controller;