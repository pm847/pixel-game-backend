const express = require('express');
const router = express.Router();

const board = require('./board');
const user = require('./user');

router.use('/board', board);
router.use('/user', user);

module.exports = exports = router;