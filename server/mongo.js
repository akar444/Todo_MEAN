var mongoUrl = "mongodb://localhost:27017/tasksdb",
	mongodb =  require("mongodb"),
    MongoClient = mongodb.MongoClient,
    _db;

module.exports = {
	connectMongo: function(cb) {
		if (_db) return cb();
		MongoClient.connect(mongoUrl, function(err, db) {
		    if (err) {
		    	return cb(err);
		    }
		    _db = db;
		    cb();
		});
	},
	getDb: function() {
		return _db;
	},
	getMongoId: function() {
		return mongodb.ObjectID;
	}

};