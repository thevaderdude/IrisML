const express = require('express');
const app = express();
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

app.get('/', (req, res) => {
	res.render("home.ejs");
});

app.get('/demos', (req, res) => {
	res.render("demos.ejs");
});

app.get('/documentation', (req, res) => {
	res.render("documentation.ejs");
});

app.get('/testing', (req, res) => {
	res.render("testing.ejs");
});

app.get('/color', (req, res) => {
	res.render("color.ejs");
});

app.get('/valen', (req, res) => {
	res.render("valen.ejs");
});

app.get('/valen/timing', (req, res) => {
	res.render("valen/timing.ejs")
	
	
});

//app.get('*', (req, res) => {
//	res.render("home.ejs");
//});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});