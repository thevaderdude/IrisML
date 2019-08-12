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

app.get('*', (req, res) => {
	res.render("home.ejs");
});

app.set('port', process.env.PORT || 8081);
