var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://<dbuser>:<dbpassword>@ds053818.mongolab.com:53818/heroku_app24197088';

var db = mongo.Db.connect(mongoUri, function (err, db) {
});

exports.findAll = function(req, res) {
	db.collection('Players', function(err,collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});
	});
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};