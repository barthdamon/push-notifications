'use strict';

var express = require('express');
var app = express();
var deviceTokens = require('./device-tokens.js');
var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'});

//MARK ROUTES
exports.sendNotification = function(req, res) {
	console.log("GOT HERE - RICHARD");
	var sns = new AWS.SNS();

	var params = {
	  Message: req.body.params.message, /* required */
	  // MessageAttributes: {
	  //   someKey: {
	  //     DataType: 'String', /* required */
	  //   },
	  //   /* anotherKey: ... */
	  // },
	  TopicArn: process.env.SNS_TOPIC_ARN
	};
	sns.publish(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});		
}