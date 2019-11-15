const express = require('express');
const fs = require('fs');

var	  bodyParser = require('body-parser'),
	  index = require('./routes/index'),
	  demos = require('./routes/demos'),
	  documentation = require('./routes/documentation'),
	  color = require('./routes/color'),
	  valen = require('./routes/valen'),
	  digitsDemo = require('./routes/digitsDemo.js'),
	  slinDemo = require('./routes/slinDemo.js'),
	  mlinDemo = require('./routes/mlinDemo.js'),
	  binDemo = require('./routes/binDemo.js');
	  preDigitsDemo = require('./routes/preDigitsDemo.js')
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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000}));
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
app.use('/demos/digits', digitsDemo);
app.use('/demos/slin', slinDemo);
app.use('/demos/mlin', mlinDemo);
app.use('/demos/log', binDemo);
app.use('/demos/pretraineddigits', preDigitsDemo);

app.get('*', (req, res) => {
	res.render("home/home.ejs");
	console.log('404');
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});
