var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	uniqueValidator = require('mongoose-unique-validator');

var playerSchema = new Schema({
	
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
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

playerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Player', playerSchema);