const Board = require('../board/board.model');
const User = require('./user.model');

const controller = {};

controller.newPlayer = (req, res) => {
  const playerId = User.getUniqueId();
  return Board.createBoardWithOnePlayer(playerId, req.body.name)
  .then((boardId) => {
    res.json({playerId: playerId, boardId: boardId});
  });
};

module.exports = exports = controller;