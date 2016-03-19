const express = require('express');
const router = express.Router();

const controller = require('./user.controller');

const Board = require('../board/board.model');

router.post('/', (req, res) => {
  return Board.createBoardWithOnePlayer(req.body.name)
  .then((result) => {
    res.json(result);
  });
});

module.exports = exports = router;