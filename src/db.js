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
	getArticles: function (render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find().limit(5).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});	
	}
};