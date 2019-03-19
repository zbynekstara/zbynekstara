var express = require('express');
var router = express.Router();

var path = require('path');

router.get('/cv', function(req, res) {
	res.download(path.join(__dirname, '../public/cv', 'zbynek_stara_cv.pdf'), 'zbynek_stara_cv.pdf');
});

router.get('/cv_czech', function(req, res) {
    res.download(path.join(__dirname, '../public/cv_czech', 'zbynek_stara_cv_czech.pdf'), 'zbynek_stara_cv_czech.pdf');
});

module.exports = router;