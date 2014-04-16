module.exports = function(app){

	var Player = require('../models/player.js');

	findAll = function(req, res) {
		Player.find(function(err, players){
			if(!err)
				res.send(players);
			else
				console.log("ERROR: " + err);
		});
	};
	 

}