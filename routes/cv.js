var express = require('express');
var router = express.Router();

var path = require('path');

router.get('/cv', function(req, res) {
	res.download(path.join(__dirname, '../public/cv', 'zbynek_stara_cv.pdf'), 'zbynek_stara_cv.pdf');
});

module.exports = router;