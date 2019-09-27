const express = require('express');
const app = express();
const authentication = require('./routes/authentication');

app.use(authentication);
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render("home/home.ejs");
});

app.get('/demos', (req, res) => {
	res.render("demos/demos.ejs");
});

app.get('/documentation', (req, res) => {
	res.render("documentation/documentation.ejs");
});

app.get('/color', (req, res) => {
	res.render("color/color.ejs");
});

app.get('/login', (req, res) => {
	res.render("users/login.ejs");
});

app.get('/profile', (req, res) => {
	res.render("users/profile.ejs");
});

app.get('/signup', (req, res) => {
	res.render("users/signup.ejs");
});

app.get('/valen', (req, res) => {
	res.render("valen.ejs");
});

app.get('/valen/timing', (req, res) => {
	res.render("valen/timing.ejs")
});

app.get('*', (req, res) => {
	res.render("home/home.ejs");
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});