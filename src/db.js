/*
{
	title:'Welcome',
	tags:['Hello', 'World'],
	category:'Test',
	text:'Welcome to zbynekstara.info!',
	author:'Zbynek Stara',
	date:'May 24, 2015'
}

{
	"title":"Welcome",
	"tags":["Hello", "World"],
	"category":"Test",
	"text":"Welcome to zbynekstara.info!",
	"author":"Zbynek Stara",
	"date":"May 24, 2015"
}
*/

var MongoClient = require('mongodb').MongoClient;

module.exports = {
	getArchives: function () {
		// change the contents of this array to change the options for the archives mixin
		var archives = ['2015'];
		return archives;
	},

	getArticles: function (render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find().sort({ "_id":-1 }).limit(5).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});
	},

	getTags: function (render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.distinct("tags", function(err, tags) {
					if (!err) {
						db.close();
						render(tags);
					}
				});
			});
		});
	},

	getCategories: function (render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.distinct("category", function(err, categories) {
					if (!err) {
						db.close();
						render(categories);
					}
				});
			});
		});
	},

	getArticlesByTag: function (tag, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find({ "tags":tag }).sort({ "_id":-1 }).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});
	},

	getArticlesByCategory: function (category, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find({ "category":category }).sort({ "_id":-1 }).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});
	},

	getArticlesByDate: function (date, render) {
		// matches a part of the date as string
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find({ "date":{ $regex:date } }).sort({ "_id":-1 }).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});
	}
};