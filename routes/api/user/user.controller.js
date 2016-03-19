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
        res.json({playerId: playerId, boardId: boardId});
      });
    } else {
      return Board.createBoardWithOnePlayer(playerId, req.body.name)
      .then((boardId) => {
        res.json({playerId: playerId, boardId: boardId});
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
};

module.exports = exports = controller;