const express = require('express');
const fs = require('fs');

var	  bodyParser = require('body-parser'),
	  index = require('./routes/index'),
	  demos = require('./routes/demos'),
	  documentation = require('./routes/documentation'),
	  color = require('./routes/color'),
	  netTrain = require('./routes/netTrain'),
	  slinTrain = require('./routes/slinTrain'),
	  mlinTrain = require('./routes/mlinTrain'),
	  binTrain = require('./routes/binTrain.js'),
	  valen = require('./routes/valen');
console.log("Did requires");
const app = express();

//AWS Config
var AWS = require("aws-sdk");

fs.readFile('auth.json', function(err, data) {
	if (err) {
		console.log("Couldn't read AWS auth data from file. Error Message: " + err);
	} else {
		var awsconfigjson = JSON.parse(data);
		console.log(awsconfigjson);
		AWS.config.update({
			accessKeyID: awsconfigjson.accessKeyID,
			secretAccessKey: awsconfigjson.secretAccessKey,
			region: awsconfigjson.region,
			endpoint: awsconfigjson.endpoint
		});
		//makeTable(); //Uncomment this line if you have never generated the IrisMLDemosLocal table
		console.log("Added AWS config");
	}
});

function makeTable() {
var dynamodb = new AWS.DynamoDB();

var tableinfo = {
	TableName: "IrisMLDemosLocal",
	KeySchema: [
		{ AttributeName: "instanceID", KeyType: "HASH" }
	],
	AttributeDefinitions: [
		{ AttributeName: "instanceID", AttributeType: "N" }
	],
	ProvisionedThroughput: {
		ReadCapacityUnits: 5,
		WriteCapacityUnits: 5
	}
};

dynamodb.createTable(tableinfo, function(err, data) {
	if (err) {
		console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
	} else {
		console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
	}	
});
}
//END AWS Config

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.json({
	type: 'application/json',
}));
app.use(express.static('public'));

app.use('/', index);
app.use('/demos', demos);
app.use('/documentation', documentation);
app.use('/color', color);
app.use('/valen', valen);

app.post('/demos/net', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemosLocal",
		Item: {
			"instanceID": 0,
			"type": "net",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
			"batchSize": req.body.inputs[3],
			"dataSetName": req.body.inputs[4],
			"layers": req.body.inputs[5],
			"epoch": [],
			"cost": [],
			"testing-inputs": []
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

app.post('/demos/slin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemosLocal",
		Item: {
			"instanceID": 0,
			"type": "slin",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
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

app.post('/demos/mlin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemosLocal",
		Item: {
			"instanceID": 0,
			"type": "mlin",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
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

app.post('/demos/bin', (req, res) => {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var item = {
		TableName: "IrisMLDemosLocal",
		Item: {
			"instanceID": 0,
			"type": "bin",
			"activation-name": req.body.inputs[0],
			"alpha": req.body.inputs[1],
			"lambda": req.body.inputs[2],
			"epochs": req.body.inputs[3],
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

app.get('*', (req, res) => {
	res.render("home/home.ejs");
	console.log('404');
});

var port = process.env.PORT || 8081;

var server = app.listen(port, function () {
	console.log('Server running at http://127.0.0.1:' + port + '/');
});
