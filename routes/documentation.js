var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("documentation/documentation.ejs");
});
module.exports = router;
