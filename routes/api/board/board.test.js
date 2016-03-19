'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/pm847-test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const Board = require('./board.model');

Board.createBoardWithOnePlayer('My name')
.then((results) => {
  console.log('result: ', results); 
  console.log('findone'); 
  return Board.findOne();
})
.then((result) => {
  console.dir(result.toObject()); 
})
.catch((err) => {
  console.error(err);
});