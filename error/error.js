var express  = require('express');
var router   = express.Router();

router.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

router.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	}

	res.render('error', { message:(err.message||'Something broke'), error:err });
});

router.use(function(err, req, res, next) {
	// log the error, treat it like a 500 internal server error
	// maybe also log the request so you have more debug information
	log.error(err, req);

	// during development you may want to print the errors to your console
	console.log(err.stack);

	// send back a 500 with a generic message
	res.render('error', { message:(err.message||'Something broke'), error:err });
});

module.exports = router;