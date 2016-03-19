'use strict';

var json = require('./win.json');

function computeResult(raw_json) {
  var width = raw_json.board.width;
  var height = raw_json.board.height;
  var final_json = {}
  var players = raw_json.players;
  var replayers = [];
  final_json.id = raw_json.id;
  final_json.board = raw_json.board;
  var remain = Array.apply(null, Array(raw_json.players.length)).map(Number.prototype.valueOf, 0);
  // console.log(remain.length);
  for (let i = 0; i < remain.length; i++) {
    for (let j = 0; j < remain.length; j++) {
      if (raw_json.players[j].x < raw_json.players[i].x + 2 &&
        raw_json.players[j].x > raw_json.players[i].x - 2 &&
        raw_json.players[j].y < raw_json.players[i].y + 2 &&
        raw_json.players[j].y > raw_json.players[i].y - 2 && i !== j) {
        remain[i]++;
      }
    }
  }
  for (let i = 0; i < remain.length; i++) {
    // console.log(remain[i]);
    if (remain[i] === 2 || remain[i] === 3) {
      replayers.push(players[i]);
    }
  }
  final_json.players =  replayers;
  final_json.round = raw_json.round + 1;

  for (let i = 0; i < raw_json.goals.length; i++) {
    for (let j = 0; j < remain.length; j++) {
      if (raw_json.goals.x == replayers.x && raw_json.goals.y == replayers.y) {
        raw_json.goals.is_achieved = true;
      }
    }
  }
  if (!replayers.length) {
    final_json.status = "lose";
  } else {
    var finished = true;
    for (let i = 0; i < raw_json.goals.length; i++) {
      if (!raw_json.goals.is_achieved) {
        finished = false;
      }
    }
    final_json.goals = raw_json.goals;
    if (finished) {
      final_json.status = "win";
    } else {
      final_json.status = "ongoing";
    }
  }
  return final_json;
}

computeResult(json);

module.exports = exports = computeResult;
