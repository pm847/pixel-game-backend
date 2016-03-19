const express = require('express');
const router = express.Router();

const controller = require('./user.controller');

router.post('/', controller.newPlayer);
router.delete('/', controller.removePlayer);
router.use('/', (err, req, res, next) => {
  return res.status(400).send(err);
});

module.exports = exports = router;