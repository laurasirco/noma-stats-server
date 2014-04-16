var express = require("express");
var logfmt = require("logfmt");
var stats = require('./routes/stats');

var app = express();

app.use(logfmt.requestLogger());

app.configure(function(){
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/stats', stats.findAll);
app.get('/stats/:id', stats.findById);
//app.post('/stats', stats.addStat);
//app.put('/stats/:id', stats.updateStat);
//app.delete('/stats/:id', stats.deleteStat);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});