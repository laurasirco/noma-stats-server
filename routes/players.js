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

	findById = function(req, res){
		Player.findById(req.param.id, function(err, player){
			if(!err)
				res.send(player);
			else
				console.log("ERROR: " + err);
		});
	};

	addPlayer = function(req, res){
		console.log('POST');
		console.log(req.body);


		var player = new Player({
			username: req.body.username,
			password: req.body.password,
			timePlayed: req.body.timePlayed,
			environment: req.body.environment,
			lastUnlockedAct: req.body.lastUnlockedAct,
			personality: req.body.personality,
			affinityWithNPC1: req.body.affinityWithNPC1,
			affinityWithNPC2: req.body.affinityWithNPC2
		});

		player.save(function(err){
			if(!err)
				console.log('created');
			else
				console.log('ERROR: ' +err);
		});


		res.send(player);
		
	}
	 

}