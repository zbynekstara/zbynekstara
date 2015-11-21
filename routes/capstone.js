var express = require('express');
var router = express.Router();

var db = require('../src/db.js');

router.get('/capstone', function(req, res) {
	res.render('capstone', { title:'Capstone' });
});

module.exports = router;