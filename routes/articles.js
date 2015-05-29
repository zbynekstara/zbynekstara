var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

var archives = db.getArchives();

router.get('/tag', function(req, res) {
	var tag = req.query.tag;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArticlesByTag(tag, function(articles) {
				res.render('articles', { title:'Articles: '+tag, articles:articles, tags:tags, categories:categories, archives:archives });
			});
		});
	});
});

router.get('/category', function(req, res) {
	var category = req.query.category;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArticlesByCategory(category, function(articles) {
				res.render('articles', { title:'Articles: '+category, articles:articles, tags:tags, categories:categories, archives:archives });
			});
		});
	});
});

router.get('/archive', function(req, res) {
	var year = req.query.year;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArticlesByDate(year, function(articles) {
				res.render('articles', { title:'Articles: '+year, articles:articles, tags:tags, categories:categories, archives:archives });
			});
		});
	});
});

module.exports = router;