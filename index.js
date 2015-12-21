'use strict';

var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

//MARK: MODULES
var bodyParser = require('body-parser');
var deviceTokens = require('./routes/device-tokens.js');
var pushem = require('./routes/pushem.js');

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
app.post('/notification/push', pushem.sendNotification);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});