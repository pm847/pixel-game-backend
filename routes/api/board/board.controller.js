const assert = require('assert');

const Board = require('../board/board.model');
const mockBoard = require('./mock.json');

const controller = {};

controller.getBoard = (req, res) => {
  Board.findById(req.query.board_id)
  .then((result) => {
    if (result) {
      result = result.toObject();
      result.id = result._id.toString();
      delete result._id;
      if ('__v' in result)
        delete result.__v;
      return res.status(200).json(result);
    } else {
      return res.status(200).json(mockBoard);
    }
  });
};

controller.nextMove = (req, res) => {
  assert(req.body.userId, 'missing userId');
  assert(req.body.boardId, 'missing boardId');
  assert(req.body.nextRound, 'missing nextRound');
  assert(req.body.nextMove, 'missing nextMove');
  assert(req.body.nextMove.x, 'missing nextMove.x');
  assert(req.body.nextMove.y, 'missing nextMove.y');

  return res.sendStatus(200);
};

module.exports = exports = controller;