const express = require('express');

var	  index = require('./routes/index'),
	  demos = require('./routes/demos'),
	  documentation = require('./routes/documentation'),
	  color = require('./routes/color'),
	  valen = require('./routes/valen');
console.log("Did requires");
const app = express();
console.log("Initted express");
const mongoose = require('mongoose');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://bobbyd:Amonalbus1!@cluster0-saber.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('connected to db!?!');
}).catch(err => {
	console.log('error:', err.message);
});

app.use('/', index);
app.use('/demos', demos);
app.use('/documentation', documentation);
console.log("Passed");
app.use('/color', color);
app.use('/valen', valen);
console.log("Used");

/*
app.use('/signup', require('./routes/authentication'));
app.use('/login', require('./routes/authentication'));

app.get('/login', (req, res) => {
	res.render("users/login.ejs");
});

app.get('/profile', (req, res) => {
	res.render("users/profile.ejs");
});

app.get('/signup', (req, res) => {
	res.render("users/signup.ejs");
});
*/

app.get('*', (req, res) => {
	res.render("home/home.ejs");
	console.log('404');
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});
