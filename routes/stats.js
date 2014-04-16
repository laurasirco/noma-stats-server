exports.findAll = function(req, res) {
    res.send([{name:'stat1'}, {name:'stat2'}, {name:'stat3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};