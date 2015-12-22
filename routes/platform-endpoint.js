'use strict';

var express = require('express');
var app = express();

//MARK: MODULES
var Promise = require('bluebird');
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});


exports.createPlatformEndpoint = function(platform, token) {
	var applicationArn = null;
	if (platform === "apple") {
		applicationArn = process.env.APPLE_ARN_ID;
		console.log("Apple device registering");
		// applicationArn = 'arn:aws:sns:us-east-1:085864041402:app/APNS/ODDPBRTestApp';
	} else if (platform === "android") {
		applicationArn = process.env.ANDROID_ARN_ID;
		console.log("Android device registering");
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

		new AWS.SNS().createPlatformEndpoint(params, function(err, data) {
		   if (err) {
		   	console.log("new platform endpoint creation failure");
				console.log(err);
				reject(err);		  	
		   }
		   else {
		   	console.log("new platform endpoint creation success");
		  		console.log(data);
		  		subscripeEndpointToTopic(data).then(function(subscriptionData) {
					resolve(data);
				}).catch(function(subscriptionErr) {
					reject(subscriptionErr);
				});
		   }
		});

	});
}

function subscripeEndpointToTopic(data) {
	console.log("Subscribing new endpoint");
	return new Promise(function(resolve, reject) {
		var endpointArn = data.EndpointArn
		var params = {
		  Protocol: 'application', /* required */
		  TopicArn: process.env.SNS_TOPIC_ARN, /* required */
		  // TopicArn: 'arn:aws:sns:us-east-1:085864041402:OddTestTopic', /* required */
		  Endpoint: endpointArn
		};
		new AWS.SNS().subscribe(params, function(err, data) {
		  	if (err) {
		  		console.log("Subscription failed");
				console.log(err); // an error occurred
				reject(err);
		  	}
		  	else {
		  		console.log("Subscription succeeded");
		  		console.log(data);
		  		resolve(data);  
		  	}
		});
	});

}

