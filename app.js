var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	users = require('./lib/users');

module.exports = app;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/users', function(req, res) {
	users.getUsers(function(err, result) {
		if (err) {
			return res.status(500).json({ success: false, reason: err.message });
		}
		res.send({ success: true, users: result});
	});
});

app.get('/users/:id', function(req, res) {
	var id = req.params.id;

	users.getUser(id, function(err, result) {
		if (err) {
			return res.status(400).json({ success: false, reason: err.message });
		}
		if (!result) {
			return res.status(404).json({ success: false, reason: 'user id unknown'});
		}

		res.send({ success: true, user: result});
	});
});

app.post('/users', function(req, res) {
	var user = req.body;

	users.addUser(user, function(err, result) {
		if (err) {
			return res.status(400).json({ success: false, reason: err.message });
		}

		res.send({ success: true, user: result});
	});
});
