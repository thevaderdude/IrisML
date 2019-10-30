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
			"type": "net",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
			"batchSize": req.body.inputs[4],
			"dataSetName": req.body.inputs[5],
			"layers": req.body.inputs[6],
			"epoch": [],
			"cost": [],
			"testing-inputs": [],
			"testing-outputs": []
		}
	};
	
	generateInstanceID(function(err, data) {
		item.Item.instanceID = data;
		docClient.put(item, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Added item:", JSON.stringify(data, null, 2));
			}
		});
	});
});

router.post('/slin', (req, res) => {

	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "slin",
			"alpha": req.body.inputs[0],
			"lambda": req.body.inputs[1],
			"epochs": req.body.inputs[2],
			"batchSize": req.body.inputs[3],
			"dataSetName": req.body.inputs[4],
			"epoch": [],
			"cost": []
		}
	};
	
	generateInstanceID(function(err, data) {
		item.Item.instanceID = data;
		docClient.put(item, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Added item:", JSON.stringify(data, null, 2));
			}
		});
	});
});

router.post('/mlin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "mlin",
			"alpha": req.body.inputs[0],
			"lambda": req.body.inputs[1],
			"epochs": req.body.inputs[2],
			"batchSize": req.body.inputs[3],
			"epoch": [],
			"cost": [],
			"dataSetName": req.body.inputs[4],
		}
	};
	
	generateInstanceID(function(err, data) {
		item.Item.instanceID = data;
		docClient.put(item, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Added item:", JSON.stringify(data, null, 2));
			}
		});
	});
});

router.post('/bin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "bin",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
			"batchSize": req.body.inputs[4],
			"dataSetName": req.body.inputs[5],
			"epoch": [],
			"cost":  [],
		}
	};
	
	generateInstanceID(function(err, data) {
		item.Item.instanceID = data;
		docClient.put(item, function(err, data) {
			if (err) {
				console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Added item:", JSON.stringify(data, null, 2));
			}
		});
	});
});

function generateInstanceID(callback) {
	var dynamodb = new AWS.DynamoDB();
	var id;
	dynamodb.scan({ TableName: "IrisMLDemos" }, function(err, data) {
		if (err) {
			callback(err, null);
		} else {
			console.log("Itemcount: " + data.Count);
			callback(null, data.Count);
		}
	});
}

module.exports = router;
