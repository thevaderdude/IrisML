const express = require('express');

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

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.json({
	type: 'application/json',
}));
app.use(express.static('public'));

app.use('/', index);
app.use('/demos', demos);
app.use('/documentation', documentation);
console.log("Passed");
app.use('/color', color);
app.use('/valen', valen);
app.use('/demos/net', netTrain);
app.use('/demos/slin', slinTrain);
app.use('/demos/mlin', mlinTrain);
app.use('/demos/bin', binTrain);
console.log("Used");

app.get('*', (req, res) => {
	res.render("home/home.ejs");
	console.log('404');
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});
