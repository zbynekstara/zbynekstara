var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

var LIMIT = 5;

router.get('/', function(req, res) {
	db.getArticles(LIMIT, function(articles) {
		db.getNumPages(LIMIT, function(numPages) {
			res.render('index', { title:'Home', articles:articles, page:1, numPages:numPages });
		});
	});
});

router.get('/page', function(req, res) {
	var page = req.query.page;
	db.getArticlesByPage(LIMIT, page, function(articles) {
		db.getNumPages(LIMIT, function(numPages) {
			res.render('index', { title:'Articles: Page '+page, articles:articles, page:page, numPages:numPages });
		});
	});
});

module.exports = router;