var express  = require('express');
var router   = express.Router();

var db = require('../src/db.js')

router.get('/', function(req, res) {
	db.getArticles(function(articles) {
		res.render('index', { title:'Home', articles:articles });
	});
});

module.exports = router;