'use strict';

const assert = require('assert');

const Board = require('../board/board.model');
const mockBoard = require('./mock.json');
const computeResult = require('../../../lib/game');

const controller = {};

controller.getBoard = (req, res) => {
  if (/^[0-9a-fA-F]{24}$/.test(req.query.board_id)){
    Board.findById(req.query.board_id)
    .then((board) => {
      // check timer expires or not
      let current = new Date();
      if (current.getTime() > board._nextRoundDeadline.getTime()){
        // 1) update next move
        board.players = board.players
        .filter((player) => (player))
        .map((player) => {
          return {
            id: player.id,
            name: player.name,
            x: (player._nextMove && player._nextMove.x) || player.x,
            y: (player._nextMove && player._nextMove.y) || player.y,
          };
        });

        // 2) compute Result
        let tidyBoard = board.toTidyObject();
        let result = computeResult(tidyBoard);

        // 3) write back to DB
        return board.nextRound(result.players, result.status)
        .then(() => Board.findById(req.query.board_id));
      }
      return board;
    })
    .then((result) => {
      if (result) {
        result = result.toTidyObject();
        return res.status(200).json(result);
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
  assert(req.body.nextMoveX, 'missing nextMoveX');
  assert(req.body.nextMoveY, 'missing nextMoveY');

  Board.updateNextMove(req.body.boardId, req.body.userId,
    req.body.nextRound, req.body.nextMoveX, req.body.nextMoveY)
  .then((result) => {
    if (result && 1 === result.nModified) {
      return res.sendStatus(204);  
    } else {
      console.error(result);
      console.error(req.body);
      return res.status(400).send('something wrong happens...');
    }
  });
};

module.exports = exports = controller;
