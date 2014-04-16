var mongo = require('mongodb');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://<dbuser>:<dbpassword>@ds053818.mongolab.com:53818/heroku_app24197088';

mongo.Db.connect(mongoUri, function (err, db) {
  db.collection('Players', function(er, collection) {
    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
    });
  });
});

exports.findAll = function(req, res) {
    res.send([{name:'stat1'}, {name:'stat2'}, {name:'stat3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};