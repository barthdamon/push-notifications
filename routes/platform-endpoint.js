'use strict';

var express = require('express');
var app = express();

//MARK: MODULES
var Promise = require('bluebird');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});


exports.createPlatformEndpoint = function(platform, token) {
	var applicationArn = null
	if (platform = "apple") {
		applicationArn = 'arn:aws:sns:us-east-1:085864041402:app/APNS/ODDPBRTestApp'
	} else if (platform = "android") {
		applicationArn = null
	}

	return new Promise(function(resolve, reject) {
			//create new platform endpoint on aws
		var params = {
		  PlatformApplicationArn: applicationArn, /* required */
		  Token: token /* required */
		  // Attributes: {
		  //   someKey: 'STRING_VALUE',
		  // //   anotherKey: ... 
		  // },
		  // CustomUserData: 'STRING_VALUE'
		};

		sns.createPlatformEndpoint(params, function(err, data) {
		   if (err) {
				console.log(err, err.stack);
				reject(err);		  	
		   }
		   else {
		  		console.log(data);
		  		resolve(data);
		   }
		});

	});
}