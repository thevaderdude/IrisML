var express = require('express');
var router = express.Router();
console.log("Initted express router ind index");

/* GET home page. */
router.get('/', function(req, res) {
	res.render("home/home.ejs");
});

module.exports = router;
