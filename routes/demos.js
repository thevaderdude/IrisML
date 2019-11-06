var express = require('express'),
	AWS = require('aws-sdk');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("demos/demos.ejs");
});

router.post('/net', (req, res) => {
	numLayers = req.body.inputs[7];
	layers = []
	for(var i = 0; i < numLayers.length; i++){
		layers[i] = parseInt(numLayers[i])
	}
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "net",
			"activation-name": req.body.inputs[0],
			"alpha": parseFloat(req.body.inputs[1]),
			"lambda": parseFloat(req.body.inputs[2]),
			"epochs": parseInt(req.body.inputs[3]),
			"batchSize": parseInt(req.body.inputs[4]),
			"dataSetName": req.body.inputs[5],
			"layers": layers,
			"epoch": [],
			"cost": [],
			"testingInputs": [],
			"testingOutputs": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}
	};
	
	generateItem(item, function(err, data) {
		if (err) {
			console.log("Error generating item: " + err);
			res.end();
		} else {
			console.log("Returned instanceID: " + data);
			res.send(data.toString());
		}
	});
});

router.post('/slin', (req, res) => {
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "slin",
			"alpha": parseFloat(req.body.inputs[0]),
			"lambda": parseFloat(req.body.inputs[1]),
			"epochs": parseInt(req.body.inputs[2]),
			"batchSize": parseInt(req.body.inputs[3]),
			"dataset": req.body.inputs[4],
			"epoch": [],
			"cost": []
		}
	};
	generateItem(item, function(err, data) {
		if (err) {
			console.log("Error generating item: " + err);
			res.end();
		} else {
			console.log("Returned instanceID: " + data);
			res.send(data.toString());
		}
	});
});

router.post('/mlin', (req, res) => {
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "mlin",
			"alpha": parseFloat(req.body.inputs[0]),
			"lambda": parseFloat(req.body.inputs[1]),
			"epochs": parseInt(req.body.inputs[2]),
			"batchSize": parseInt(req.body.inputs[3]),
			"epoch": [],
			"cost": [],
			"dataSetName": req.body.inputs[4],
		}
	};
	
	generateItem(item, function(err, data) {
		if (err) {
			console.log("Error generating item: " + err);
			res.end();
		} else {
			console.log("Returned instanceID: " + data);
			res.send(data.toString());
		}
	});
});

router.post('/bin', (req, res) => {
	var item = {
		TableName: "IrisMLDemos",
		Item: {
			"type": "bin",
			"activation-name": req.body.inputs[0],
			"alpha": parseFloat(req.body.inputs[1]),
			"lambda": parseFloat(req.body.inputs[2]),
			"epochs": parseInt(req.body.inputs[3]),
			"batchSize": parseInt(req.body.inputs[4]),
			"dataSetName": req.body.inputs[5],
			"epoch": [],
			"cost":  [],
		}
	};
	
	generateItem(item, function(err, data) {
		if (err) {
			console.log("Error generating item: " + err);
			res.end();
		} else {
			console.log("Returned instanceID: " + data);
			res.send(data.toString());
		}
	});
});

router.get('/newdata', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	docClient.query({
		TableName: "IrisMLDemos",
		ConsistentRead: true,
		KeyConditionExpression: "instanceID = :id",
		ExpressionAttributeValues: {
			":id": Number(req.query.instanceID)
		}
	}, function(err, data) {
		if (err) {
			console.log("Couldn't read table. Error: " + err);
			return;
		}
		if (data.Count < 1) {
			console.log("0 results for instanceID.");
			return;
		}
		res.send(data.Items[0]);
	});
		
});

router.post('/guess', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	
	for(var i = 0; i < req.body.data.length; i++) {
		req.body.data[i] = Number(req.body.data[i]);
	}
	
	docClient.update({
		TableName: "IrisMLDemos",
		Key: {"instanceID": Number(req.body.instanceID)},
		UpdateExpression: "set #ti = :d",
		ExpressionAttributeValues: {":d": req.body.data},
		ExpressionAttributeNames: { "#ti": "testingInputs"},
		ReturnValues: "UPDATED_NEW"
	}, function(err, data) {
		if (err) {
			console.log("Unable to write testing data to server. Error: " + err);
			return;
		}
		console.log("Sent testing data");
		res.end();
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
