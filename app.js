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
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/players', findAll);
app.get('/players/:id', findById);
app.post('/player', addPlayer);
//app.put('/stats/:id', stats.updateStat);
//app.delete('/stats/:id', stats.deleteStat);

var uristring = process.env.MONGOLAB_URI ||
    'mongodb://localhost/players';

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