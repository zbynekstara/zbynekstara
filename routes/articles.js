var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

router.get('/article', function(req, res) {
	var address = req.query.article;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getArticle(address, function(article) {
					var articles = [article];
					res.render('articles', { title:'Article: '+article.title, articles:articles, complete:true, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

router.get('/articles', function(req, res) {
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getArticles(0, function(articles) {
					res.render('articles', { title:'Articles', articles:articles, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

router.get('/tag', function(req, res) {
	var tag = req.query.tag;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getArticlesByTag(tag, function(articles) {
					res.render('articles', { title:'Articles: '+tag, articles:articles, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

router.get('/category', function(req, res) {
	var category = req.query.category;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getArticlesByCategory(category, function(articles) {
					res.render('articles', { title:'Articles: '+category, articles:articles, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

router.get('/archive', function(req, res) {
	var year = req.query.year;
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getArticlesByDate(year, function(articles) {
					res.render('articles', { title:'Articles: '+year, articles:articles, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

module.exports = router;