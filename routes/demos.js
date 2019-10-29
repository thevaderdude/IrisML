var express = require('express'),
	AWS = require('aws-sdk');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("demos/demos.ejs");
});

router.post('/net', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"instanceID": 0,
			"type": "net",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
			"batchSize": req.body.inputs[4],
			"dataSetName": req.body.inputs[5],
			"layers": req.body.inputs[6]
		}
	};
	
	docClient.put(item, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
});

router.post('/slin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"instanceID": 0,
			"type": "slin",
			"alpha": req.body.inputs[0],
			"lambda": req.body.inputs[1],
			"epochs": req.body.inputs[2],
			"batchSize": req.body.inputs[3],
			"dataSetName": req.body.inputs[4]
		}
	};
	
	docClient.put(item, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
});

router.post('/mlin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"instanceID": 0,
			"type": "mlin",
			"alpha": req.body.inputs[0],
			"lambda": req.body.inputs[1],
			"epochs": req.body.inputs[2],
			"batchSize": req.body.inputs[3],
			"dataSetName": req.body.inputs[4]
		}
	};
	
	docClient.put(item, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
});

router.post('/bin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"instanceID": 0,
			"type": "bin",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
			"batchSize": req.body.inputs[4],
			"dataSetName": req.body.inputs[5]
		}
	};
	
	docClient.put(item, function(err, data) {
		if (err) {
			console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
		} else {
			console.log("Added item:", JSON.stringify(data, null, 2));
		}
	});
});

module.exports = router;
