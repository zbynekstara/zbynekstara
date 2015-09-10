/*
{
	"article":"welcome",
	"title":"Welcome",
	"tags":["Hello", "World"],
	"category":"Test",
	"intro":"<p>Welcome to zbynekstara.info!</p>",
	"readMore":"<p>Here I share tips and tricks I learned while coding.</p>",
	"author":"Zbynek Stara",
	"date":"May 24, 2015"
}
*/

var MongoClient = require('mongodb').MongoClient;

module.exports = {
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

	getArchives: function (render) {
		// change the contents of this array to change the options for the archives mixin
		var archives = ['2015'];
		render(archives);
	},

	getProjects: function (render) {
		// change the contents of this array to change contents of portfolio page
		var projects = [
			{
				"title":"zbynekstara.info",
				"caption":"This website. Developed with love using Node.js.",
				"development":"Development stack: Node.js + Jade + Express + MongoDB + Heroku",
				"img":"img/portfolio_zbynekstara.png",
				"link":"http://zbynekstara.info",
				"code":"https://github.com/zbynekstara/zbynekstara"
			}
			,
			{
				"title":"NYUAD EmailTemplater",
				"caption":"NYUAD internship project. Drag-and-drop functionality makes it trivial to create and use email templates for university newsletters. The Web Services staff no nonger need to write each template by hand.",
				"development":"Development stack: PHP + JavaScript + JQuery + Blade",
				"img":"img/portfolio_emailtemplater.png",
				"link":"",
				"code":""
			},
			{
				"title":"SingleDrop/QataretHaya",
				"caption":"2015 NYUAD Hackathon project. Designed to help connect blood donors with hospitals in countries of the Middle East.",
				"development":"Development stack: Python + Flask + SQLAlchemy + Heroku",
				"img":"img/portfolio_singledrop.png",
				"link":"http://singledrop.herokuapp.com",
				"code":"https://github.com/zbynekstara/SingleDrop"
			},
			{
				"title":"Findmethewords",
				"caption":"Startup web dictionary that allows users to save their words and remember them through spaced-out reminders.",
				"development":"Development stack: Python + Tornado + MySQL + Heroku",
				"img":"img/portfolio_findmethewords.png",
				"link":"http://findmethewords.com",
				"code":""
			}
		];
		render(projects);
	},

	getNumPages: function (limit, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.count(function(err, numArticles) {
					if (!err) {
						db.close();
						var numPages = Math.ceil(numArticles/limit);
						render(numPages);
					}
				});
			});
		});
	},

	getArticle: function (address, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.findOne({ "article":address }, function(err, article) {
					if (!err) {
						db.close();
						render(article);
					}
				});
			});
		});
	},

	getArticles: function (limit, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find().sort({ "_id":-1 }).limit(limit).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
					}
				});
			});
		});
	},

	getArticlesByPage: function (limit, page, render) {
		MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/test', function(err, db) {
			if(!err) db.collection('articles', function(err, collection) {
				if (!err) collection.find().sort({ "_id":-1 }).skip(limit*(page-1)).limit(limit).toArray(function(err, articles) {
					if (!err) {
						db.close();
						render(articles);
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