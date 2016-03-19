var express = require('express');
var router = express.Router();
var board = require('../lib/board');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get board
router.get('/board', (req, res) => {
    res.json(board.getBoard());
});

module.exports = router;
