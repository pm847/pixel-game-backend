const express = require('express');
const router = express.Router();

const controller = require('./board.controller');

router.get('/', controller.getBoard);

router.post('/', controller.nextMove);

router.use('/', (err, req, res, next) => {
  return res.status(400).send(err);
});

module.exports = exports = router;