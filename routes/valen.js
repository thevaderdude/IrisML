var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("valen.ejs");
});

router.get('/timing', function(req, res, next) {
	res.render("valen/timing.ejs");
});

module.exports = router;
