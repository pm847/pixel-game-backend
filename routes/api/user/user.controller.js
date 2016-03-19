const Board = require('../board/board.model');

const controller = {};

controller.newPlayer = (req, res) => {
  return Board.createBoardWithOnePlayer(req.body.name)
  .then((result) => {
    res.json(result);
  });
};

module.exports = exports = controller;