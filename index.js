'use strict';

var express = require('express');
var app = express();

//MARK: MODULES
var bodyParser = require('body-parser');
var deviceTokens = require('./routes/device-tokens.js');

//MARK: MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//MARK: ROUTES
app.get('/', function(req, res) {
	res.status(200).json({"message":"Server Online"});
});
app.post('/', function(req, res) {
	res.status(200).json({"message":"Server Online"});
});

app.post('/device/new', deviceTokens.addToken);

app.listen(3000);