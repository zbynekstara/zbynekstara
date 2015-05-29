var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

router.get('/portfolio', function(req, res) {
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			db.getArchives(function(archives) {
				db.getProjects(function(projects) {
					res.render('portfolio', { title:'Portfolio', projects:projects, tags:tags, categories:categories, archives:archives });
				});
			});
		});
	});
});

module.exports = router;