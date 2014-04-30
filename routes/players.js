module.exports = function(app){

	var Player = require('../models/player.js');

	//Listar todos
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

	//Buscar por nombre de usuario
	findByUsername = function(req, res){
		
		console.log('finding: ' +req.param("username"));

		Player.findOne({username: req.param("username")}, function(err, player){
			if(!err)
				res.send(player);
			else
				console.log('ERROR: ' +err);
		});

	}

	//Anadir nuevo usuario
	addPlayer = function(req, res){
		
		console.log('POST');
		//console.log(req.body);
		var counter = -1;

		Player.find().sort({_id: -1}).limit(1).find(function(err, doc) {
			if(!err){
				
				if(typeof doc[0] !== "undefined") {
					console.log("doc " + doc[0].username);
					counter = doc[0].username;
				}

				var player = new Player({
					username: counter + 1,
					password: req.body.password,
					timePlayed: req.body.timePlayed,
					environment: req.body.environment,
					lastUnlockedAct: req.body.lastUnlockedAct,
					personality: req.body.personality,
					affinityWithNPC1: req.body.affinityWithNPC1,
					affinityWithNPC2: req.body.affinityWithNPC2,
					createdAt: new Date()
				});

				player.save(function(err){
					if(err){
						response = err;
						console.log(response);
						res.send(response);
					}
					else{
						response = '{ "username": ' +player.username+ '}';
						console.log(response);
						res.send(response);
					}
				});
			}
			else
				console.log("error: " + err);
		});
		
	}

	//Actualizar el tiempo jugado
	updatePlayedTime = function(req, res){

		console.log('UPDATE');

		Player.findOne({username: req.param("username"), password: new RegExp('^'+req.param("password")+'$', 'i')}, function(err, player){
		    
		    player.timePlayed = player.timePlayed + req.body.timePlayed;

		    player.save(function(err) {
		      if(err) {
		  		response = err;
				console.log(response);
				res.send(response);
		      } else {
		  		response = true;
				console.log(response);
				res.send(response);
		      }

      		res.send(player);
    		});
  		});

	}

	//Actualizar el entorno
	updateEnvironment = function(req, res){

		console.log('UPDATE');

		Player.findOne({username: req.param("username"), password: new RegExp('^'+req.param("password")+'$', 'i')}, function(err, player){
		    
		    player.environment.push(req.body.environment);

		    player.save(function(err) {
		      if(err) {
		  		response = err;
				console.log(response);
				res.send(response);
		      } else {
		  		response = true;
				console.log(response);
				res.send(response);
		      }

      		res.send(player);
    		});
  		});

	}

	//Actualizar el ultimo acto desbloqueado
	updateLastUnlockedAct = function(req, res){

		console.log('UPDATE');

		Player.findOne({username: req.param("username"), password: new RegExp('^'+req.param("password")+'$', 'i')}, function(err, player){
		    
		    player.lastUnlockedAct = req.body.lastUnlockedAct;

		    player.save(function(err) {
		      if(err) {
		  		response = err;
				console.log(response);
				res.send(response);
		      } else {
		  		response = true;
				console.log(response);
				res.send(response);
		      }

      		res.send(player);
    		});
  		});

	}

	//Actualizar personalidad del jugador
	updatePersonality = function(req, res){

		console.log('UPDATE');

		Player.findOne({username: req.param("username"), password: new RegExp('^'+req.param("password")+'$', 'i')}, function(err, player){
		    
		    player.personality = req.body.personality;

		    player.save(function(err) {
		      if(err) {
		  		response = err;
				console.log(response);
				res.send(response);
		      } else {
		  		response = true;
				console.log(response);
				res.send(response);
		      }

      		res.send(player);
    		});
  		});

	}

	//Actualizar afinidad con NPC
	updateAffinityOfNPC = function(req, res){

		console.log('UPDATE');

		Player.findOne({username: req.param("username"), password: new RegExp('^'+req.param("password")+'$', 'i')}, function(err, player){
		    
		    if(req.body.world == 1){
		    	player.affinityWithNPC1.set(req.body.NPC, req.body.value);
		    }
		    else if(req.body.world == 2){
		    	player.affinityWithNPC2.set(req.body.NPC, req.body.value);
		    }

		    player.save(function(err) {
		      if(err) {
		  		response = err;
				console.log(response);
				res.send(response);
		      } else {
		  		response = true;
				console.log(response);
				res.send(response);
		      }

      		res.send(player);
    		});
  		});

	}
	 

}