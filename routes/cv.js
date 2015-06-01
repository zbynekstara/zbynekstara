var express = require('express');
var router = express.Router();

router.get('/cv', function(req, res) {
	res.download('/cv/zbynek_stara_cv.pdf');
});

module.exports = router;