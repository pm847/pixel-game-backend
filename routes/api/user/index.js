const express = require('express');
const router = express.Router();

const controller = require('./user.controller');

router.post('/', (req, res) => {
  res.json({
    userId: 'abcd-efgh',
    boardId: 'asdfasdf',
  });
});

module.exports = exports = router;