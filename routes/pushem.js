'use strict';

let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

function buildApplePush(appleMessage, appleLink){
	if (!appleMessage) { return null; }
	let result = {aps: {alert: appleMessage}};
	if (appleLink) {
		result.aps.url = appleLink;
	}
	return JSON.stringify(result);
}

function buildAndroidPush(androidMessage, androidLink){
	if (!androidMessage) { return null; }
	let result = {data: {message: androidMessage}};
	if (androidLink) {
		result.data.url = androidLink;
	}
	return JSON.stringify(result);
}

exports.sendNotification = function(req, res) {
	let applePush   = buildApplePush(req.body.appleMessage, req.body.appleLink);
	let androidPush = buildAndroidPush(req.body.androidMessage, req.body.androidLink);

	if (!(applePush || androidPush)) {
		return res.status(400).json({message: 'No push notification supplied.'});
	}

	let message = {};
	if (applePush) {
		message.APNS = applePush;
	}
	if (androidPush) {
		message.ADM = androidPush;
	}
	let snsParams = {
		TopicArn: process.env.SNS_TOPIC_ARN,
		MessageStructure: 'json',
		Message: JSON.stringify(message);
	}

	new AWS.SNS().publish(snsParams, function(err, data) {
		if (err) {
			res.status(400).json({ message: err });

		} else {
			res.status(200).json({ message: "Push notification created" });
		}
	});
}
