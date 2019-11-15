var express = require('express'),
	AWS = require('aws-sdk');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("demos/slinDemo.ejs");
});

module.exports = router;