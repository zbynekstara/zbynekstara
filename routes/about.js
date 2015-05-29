var express  = require('express');
var router   = express.Router();

var db = require('../src/db.js');

var archives = db.getArchives();

router.get('/about', function(req, res) {
	db.getTags(function(tags) {
		db.getCategories(function(categories) {
			res.render('about', { title:'About Me', tags:tags, categories:categories, archives:archives });
		});
	});
});

module.exports = router;