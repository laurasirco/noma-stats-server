var express = require("express");
var logfmt = require("logfmt");
var players = require('./routes/players');
var mongoose = require('mongoose');
var app = express();
var routes = require('./routes/players')(app);

app.use(logfmt.requestLogger());

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res) {           
    res.sendfile('./public/index.html');        
});

app.get('/api/games', findAll);
app.get('/api/game/:username', findByUsername);
app.post('/api/game', addPlayer);
app.put('/api/updateTime/:username', updatePlayedTime);
app.put('/api/updateEnvironment/:username', updateEnvironment);
app.put('/api/updateLastUnlockedAct/:username', updateLastUnlockedAct);
app.put('/api/updatePersonality/:username', updatePersonality);
app.put('/api/updateAffinityOfNPC/:username', updateAffinityOfNPC);

var uristring = process.env.MONGOLAB_URI ||
    'mongodb://localhost/games';

var theport = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});