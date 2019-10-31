var express = require('express'),
	AWS = require('aws-sdk');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("demos/demos.ejs");
});

router.post('/net', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();

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
				var params = {
					docClient: docClient,
					instanceID: item.Item.instanceID
				};
				console.log("checking completion for instanceID: " + params.instanceID);
				checkTrainCompletion(params, function(err, data) {
					if (err) {
						console.log("Error checking for completed data. Error Message: " + err);
					} else {
						console.log("Training data complete. Length of cost array: " + data);
						res.item = data;
					}
				});
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
			"alpha": parseFloat(req.body.inputs[0]),
			"lambda": parseFloat(req.body.inputs[1]),
			"epochs": parseInt(req.body.inputs[2]),
			"batchSize": parseInt(req.body.inputs[3]),
			"dataset": req.body.inputs[4],
			"slope": 10,
			"intercept": 10,
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
				var params = {
					docClient: docClient,
					instanceID: item.Item.instanceID
				};
				console.log("checking completion for instanceID: " + params.instanceID);
				checkTrainCompletion(params, function(err, data) {
					if (err) {
						console.log("Error checking for completed data. Error Message: " + err);
					} else {
						console.log("Training data complete. Length of cost array: " + data);
						res.item = data;
					}
				});
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
			"alpha": parseFloat(req.body.inputs[0]),
			"lambda": parseFloat(req.body.inputs[1]),
			"epochs": parseInt(req.body.inputs[2]),
			"batchSize": parseInt(req.body.inputs[3]),
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
				var params = {
					docClient: docClient,
					instanceID: item.Item.instanceID
				};
				console.log("checking completion for instanceID: " + params.instanceID);
				checkTrainCompletion(params, function(err, res, data) {
					if (err) {
						console.log("Error checking for completed data. Error Message: " + err);
					} else {
						console.log("Training data complete. Length of cost array: " + data);
						res.item = data;
					}
				});
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
			"alpha": parseFloat(req.body.inputs[1]),
			"lambda": parseFloat(req.body.inputs[2]),
			"epochs": parseInt(req.body.inputs[3]),
			"batchSize": parseInt(req.body.inputs[4]),
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
				var params = {
					docClient: docClient,
					instanceID: item.Item.instanceID
				};
				console.log("checking completion for instanceID: " + params.instanceID);
				checkTrainCompletion(params, function(err, data) {
					if (err) {
						console.log("Error checking for completed data. Error Message: " + err);
					} else {
						console.log("Training data complete. Length of cost array: " + data);
						res.item = data;
					}
				});
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
			} else {
				
				if(dbdata.Count < 1) {
					callback("0 results for instanceID when checking for train completion.", null);
				} else {
					if(dbdata.Items[0].cost.length) {
						callback(null, dbdata.Items[0]);
					} else {
						console.log("No change in Train data");
						checkTrainCompletion(data, callback);
					}
				}
			}
		});
	}, 1000);
}

module.exports = router;
