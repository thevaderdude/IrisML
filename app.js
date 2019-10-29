const express = require('express');
const fs = require('fs');

var	  bodyParser = require('body-parser'),
	  index = require('./routes/index'),
	  demos = require('./routes/demos'),
	  documentation = require('./routes/documentation'),
	  color = require('./routes/color'),
	  netTrain = require('./routes/netTrain'),
	  slinTrain = require('./routes/slinTrain'),
	  mlinTrain = require('./routes/mlinTrain'),
	  binTrain = require('./routes/binTrain.js'),
	  valen = require('./routes/valen');
console.log("Did requires");
const app = express();

//AWS Config
var AWS = require("aws-sdk");

fs.readFile('auth.json', function(err, data) {
	if (err) {
		console.log("Couldn't read AWS auth data from file. Error Message: " + err);
	} else {
		var awsconfigjson = JSON.parse(data);
		console.log(awsconfigjson);
		AWS.config.update({
			accessKeyID: awsconfigjson.accessKeyID,
			secretAccessKey: awsconfigjson.secretAccessKey,
			region: awsconfigjson.region,
			endpoint: awsconfigjson.endpoint
		});
		console.log("Added AWS authentication info from file.");
	}
});

//END AWS Config

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.json({
	type: 'application/json',
}));
app.use(express.static('public'));

app.use('/', index);
app.use('/demos', demos);
app.use('/documentation', documentation);
app.use('/color', color);
app.use('/valen', valen);

app.get('*', (req, res) => {
	res.render("home/home.ejs");
	console.log('404');
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});
