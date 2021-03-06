var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

router.get('/about', function(req, res) {
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				res.render('about', { title:'About Me', tags:tags, categories:categories, archives:archives });
			});
		});
	});
});

module.exports = router;