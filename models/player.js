var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var playerSchema = new Schema({
	
	username: { type: String },
	password: { type: String },
	timePlayed: {type: Number },
	environment: { type: Array },
	lastUnlockedAct: { type: Number },
	personality: { 
		activity: { type: Number },
		conversation: { type: Number },
		temperament: { type: Number },
		confidence: { type: Number }
	},
	affinityWithNPC1: { type: Array },
	affinityWithNPC2: { type: Array }

});

module.exports = mongoose.model('Player', playerSchema);