var express  = require('express');
var router   = express.Router();

var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res) {
	MongoClient.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
		if(!err);
		db.collection('articles', function(err, collection) {
			if (!err);
			collection.find().sort({ "id":-1 }).limit(5).toArray(function(err, articles) {
				if (!err);
				db.close();

				res.render('index', { title:'Home', articles:articles });
			});
		});
	});	
});

module.exports = router;