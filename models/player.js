var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	uniqueValidator = require('mongoose-unique-validator');
	autoIncrement = require('mongoose-auto-increment');

var uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/games';

var connection = mongoose.createConnection(uristring);

autoIncrement.initialize(connection);

var playerSchema = new Schema({
	
	username: { type: Number, required: true, unique: true },
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
	affinityWithNPC2: { type: Array },
	createdAt: Date

});

playerSchema.plugin(uniqueValidator);
//playerSchema.plugin(autoIncrement, 'Player');

module.exports = mongoose.model('Player', playerSchema);