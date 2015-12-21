'use strict';

var express = require('express');
var app = express();

// //MARK: MODULES
var mongoose = require('mongoose');
var env = process.env.NODE_ENV;
mongoose.connect(env == "development" ? 'mongodb://localhost/odd-push' : 'mongodb://localhost/odd-push');

//MARK: MODELS
var deviceSchema = mongoose.Schema({
	token: String
});
var DeviceToken = mongoose.model('DeviceToken', deviceSchema);


//MARK ROUTES
exports.addToken = function(req, res) {
	var newToken = req.body.params.token;
	var newDevice = new DeviceToken({
		token: req.body.params.token,
	});

	newDevice.save(function(err) {
		if (err) {
			res.status(400).json({ "message": "notification token registration failure: " + err });
		} else {
			res.status(200).json({ "message": "notification token registration successful" });
		}
	});
}