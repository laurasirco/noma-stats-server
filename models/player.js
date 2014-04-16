var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var playerSchema = new Schema({
	
	username: String,
	password: String,
	timePlayed: Number,
	environment: [Number],
	lastUnlockedAct: Number,
	personality: { 
		activity: Number,
		conversation: Number,
		temperament: Number,
		confidence: Number
	},
	affinityWithNPC1: [Number],
	affinityWithNPC2: [Number]

});

module.exports = mongoose.model('Player', playerSchema);