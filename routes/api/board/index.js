const assert = require('assert');
const express = require('express');
const router = express.Router();

const controller = require('./board.controller');

router.get('/', (req, res) => {
  res.status(200).json({
    id: "abcd1234",
    board: {
      width: 100,
      height: 100
    },
    round: 10,
    players: [{
      id: 123,
      name: "player A",
      x: 55,
      y: 33   
    }, {
      id: 128,
      name: "player B",
      x: 54,
      y: 33
    }],
    goals: [{
      x: 10,
      y: 12,
      is_achieved: false
    }]
  });
});

router.post('/', (req, res) => {
  assert(req.body.userId, 'missing userId');
  assert(req.body.boardId, 'missing boardId');
  assert(req.body.nextRound, 'missing nextRound');
  assert(req.body.nextMove, 'missing nextMove');
  assert(req.body.nextMove.x, 'missing nextMove.x');
  assert(req.body.nextMove.y, 'missing nextMove.y');

  return res.sendStatus(200);
});

router.use('/', (err, req, res, next) => {
  return res.status(400).send(err);
});

module.exports = exports = router;