var json = {

        id: 'abcd1234',
        board: {
            width: 100,
            height: 100
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
        },{
	    id:456,
	    name: 'player C',
	    x:56,
	    y:33
	},{
	    id:839,
	    name: 'player D',
	    x:56,
	    y:32
	},{
	    id:709,
	    name: 'player E',
	    x:55,
	    y:31
	}],
        goals: [{
            x: 55,
            y: 33,
            is_achieved: false,
        }],
        origin: {
            x: 5,
            y: 5
        }
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
				&& raw_json.players[j].y < raw_json.players[i].y+2
				&& raw_json.players[j].y > raw_json.players[i].y-2
				&& i !== j){
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
	
	for(var i=0;i<raw_json.goals.length;i++){
		for(var j=0;j<remain.length;j++){
			if(raw_json.goals.x == replayers.x && raw_json.goals.y == replayers.y){
				raw_json.goals.is_achieved = true;
			}	
		}
	}
	if(!replayers.length){
		final_json.set('status',"lose");
	}else{	
		var finished = true;
		for(var i=0;i<raw_json.goals.length;i++){
			if(!raw_json.goals.is_achieved){
				finished = false;
			}
		}
		final_json.set('goals',raw_json.goals);
		if(finished){
			final_json.set('status',"win");
		}else{
			final_json.set('status',"ongoing");
		}
	}
	final_json.forEach(function(x){
		console.log(x);
	})
	return final_json;
}


computeResult(json);

module.exports = exports = computeResult;
