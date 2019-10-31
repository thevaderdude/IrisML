var express = require('express'),
	AWS = require('aws-sdk');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("demos/demos.ejs");
});

router.post('/net', (req, res) => {
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
	
	generateItem(item, function(err, data) {
		console.log("Returned instanceID: " + data);
		res.send(data.toString());
	});
});

router.post('/slin', (req, res) => {
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "slin",
			"alpha": req.body.inputs[0],
			"lambda": req.body.inputs[1],
			"epochs": req.body.inputs[2],
			"batchSize": req.body.inputs[3],
			"dataset": req.body.inputs[4],
			"slope": 10,
			"intercept": 10,
			"epoch": [],
			"cost": []

		}
	};
	
	generateItem(item, function(err, data) {
		console.log("Returned instanceID: " + data);
		res.send(data.toString());
		});
});

router.post('/mlin', (req, res) => {
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
	
	generateItem(item, function(err, data) {
		console.log("Returned instanceID: " + data);
		res.send(data.toString());
	});
});

router.post('/bin', (req, res) => {
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
	
	generateItem(item, function(err, data) {
		console.log("Returned instanceID: " + data);
		res.send(data.toString());
	});
});

function generateItem(data, callback) {
	var dynamodb = new AWS.DynamoDB();
	var docClient = new AWS.DynamoDB.DocumentClient();
	dynamodb.scan({ TableName: "IrisMLDemos" }, function(err, scanData) {
		if (err) {
			callback("Unable to read table. Error JSON: " + JSON.stringify(err, null, 2), null);
			return;
		}
		console.log("Itemcount: " + scanData.Count);
		var instanceID = scanData.Count;
		data.Item.instanceID = instanceID;
		docClient.put(data, function(err, putData) {
			if (err) {
				callback("Unable to add item. Error JSON: " + JSON.stringify(err, null, 2), null);
				return;
			}
			console.log("Added item: " + JSON.stringify(putData, null, 2));
			callback(null, instanceID);
		});
	});
}

function checkTrainCompletion(data, callback) {
	setTimeout(function() {
		data.docClient.query({
			TableName: "IrisMLDemos",
			ConsistentRead: true,
			KeyConditionExpression: "instanceID = :id",
			ExpressionAttributeValues: {
				":id": data.instanceID
			}
		}, function(err, dbdata) {
			if (err) {
				callback("Could not read DynamoDB table. Error Message: " + err, null);
			}				
			if(dbdata.Count < 1) {
				callback("0 results for instanceID when checking for train completion.", null);
			}
			if(dbdata.Items[0].cost.length) {
				callback(null, dbdata.Items[0]);
			} else {
				console.log("No change in Train data");
				checkTrainCompletion(data, callback);
			}
		});
	}, 1000);
}

module.exports = router;
