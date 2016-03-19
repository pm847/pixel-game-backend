const express = require('express');
const router = express.Router();

const controller = require('./user.controller');

router.post('/', controller.newPlayer);

module.exports = exports = router;