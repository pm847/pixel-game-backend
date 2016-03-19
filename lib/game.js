var json =     {
        id: 'abcd1234',
        board: {
            width: 10,
            height: 10
        },
        round: 10,
        players: [{
            id: 123,
            name: 'player A',
            x: 55,
            y: 33   
        }, {
            id: 128,
            name: 'player B',
            x: 54,
            y: 33   
        }],
        goals: [{
            x: 10,
            y: 12,
            is_achieved: false,
        }],
	status:"ongoing"
    }
function computeResult(raw_json){
var width = raw_json.board.width;
var height = raw_json.board.height;
var final_json = new Map();
var players = raw_json.players;
var replayers =[];
final_json.set('id',raw_json.id);
final_json.set('board',raw_json.board);
var remain = Array.apply(null, Array(raw_json.players.length)).map(Number.prototype.valueOf,0);
	console.log(remain.length);
	for(var i=0;i<remain.length;i++){
		for(var j=0;j<remain.length;j++){
			if(raw_json.players[j].x < raw_json.players[i].x+2 
				&& raw_json.players[j].x > raw_json.players[i].x-2
				&& raw_json.players[j].x !== raw_json.players[i].x){
				remain[i]++;
			}
		}
	}
	for(var i=0;i<remain.length;i++){
		console.log(remain[i]);
		if(remain[i] === 2 || remain[i] === 3){
			replayers.push(players[i]);	
		}
	}
	final_json.set('players',replayers);
	final_json.set('round',raw_json.round+1);
	final_json.forEach(function(x){
		console.log(x);
	})
	raw_json.goals.forEach(function(goal){
		for(var i=0;i<remain.length;i++){
			if(goal.x == replayers.x && goal.y == replayers.y){
				goal.is_achieved = true;
			}	
		}
	})
		
}


computeResult(json);

module.exports = exports = computeResult;
