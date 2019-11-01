var netStart = document.querySelector("#net-start");
var netReset = document.querySelector("#net-reset");
var guess = document.getElementById("guess");
var numLayers = document.getElementById('layers');
var nodes = document.getElementById("nodes");
var nodesLayer = document.getElementById("nodesLayer");
var activation = document.getElementById("net-activation");
var net_dataset = document.getElementById("net-dataset");
var nodesArray = [];

var netLastEpoch;

var netInstanceID;
var netDataChecker;
var netSameCounter = 0;

var netctx = document.getElementById('net-chart').getContext('2d');

var netChart = new Chart(netctx, {

    type: 'line',

    data: {
        labels: ['1','2','3','4','5'],
        datasets: [{
            data: [1000,500,200,100,50],
            pointBorderColor: 'rgb(255,223,0)',
            borderColor: 'rgb(255,223,0)',
        }],
    },

    options: {
        title:{
            display: true,
            text: 'Epoch vs Cost',
            fontSize: 24
        },
        legend:{
            display: false
        },
        scales:{
            yAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Cost',
                    fontSize: 18
                },
                ticks: {
                    min: 0
                }
            }],
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Epoch',
                    fontSize: 18
                },
            }],
        }
    }
});

function addNetData(chart, labels, dataPoints) {
    labels.forEach((label) => {
        chart.data.labels.push(label);
    })
    chart.data.datasets.forEach((dataset) => {
        dataPoints.forEach((point) => {
            dataset.data.push(point);
        })
    });
    chart.update();
}

function removeNetData(chart) {
    var length = chart.data.labels.length;
    for(var i = 0; i < length; i++){
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
    }
    chart.update();
}

netReset.addEventListener('click', function(){
    document.getElementById("net-epochs").value = document.getElementById("net-epochs").placeholder;
    document.getElementById("net-batchSize").value = document.getElementById("net-batchSize").placeholder;
    document.getElementById("net-datasetName").value = document.getElementById("net-datasetName").placeholder;
    document.getElementById("net-activationName").value = document.getElementById("net-activationName").placeholder;
    document.getElementById("net-alpha").value = document.getElementById("net-alpha").placeholder;
    document.getElementById("net-lambda").value = document.getElementById("net-lambda").placeholder;
    document.getElementById("layers").value = document.getElementById("layers").placeholder; 
    document.getElementById("net-activation").value = document.getElementById("net-activation").options[0].value;
});

netStart.addEventListener('click', function(){
    if(nodesArray.length == 0){
        nodesArray = [16, 16]
    }
    array = [
        document.getElementById("net-activationName"),
        document.getElementById("net-alpha"),
        document.getElementById("net-lambda"),
		document.getElementById("net-epochs"),
		document.getElementById("net-batchSize"),
        document.getElementById("net-datasetName"),
        document.getElementById("layers"),
        nodesArray
    ]
    inputs = []
    // checks to see if inputs have been made
    for(var i = 0; i < array.length - 1; i++){
        if(array[i].value === ''){
            inputs.push(array[i].placeholder);
        } else {
            inputs.push(array[i].value);
        }
    }
    inputs.push(array[array.length - 1]);
    
    $.ajax({
        url: '/demos/net',
        type: "POST",
        data: {inputs},
        success: function(res){
            
			netInstanceID = Number(res);
			console.log("netInstanceID is " + netInstanceID);
			alert("Starting checkNewNetData for net");
			netDataChecker = setInterval(checkNewNetData, 1000);
			//removeNetData(netChart);
            //addNetData(netChart, res.item.epoch, res.item.cost);
        },
        error: function(err){
            console.log(err)
        }
    }); 
});

function checkNewNetData() {
	$.ajax({
		url: '/demos/newdata',
		type: "GET",
		data: {instanceID: netInstanceID},
		success: function(res) {
			console.log(res);
			if (netLastEpoch != res.epoch[res.epoch.length-1]) {
				netLastEpoch = res.epoch[res.epoch.length-1];
				updateNetGraph(res);
				console.log("Got new data and updated graph");
			} else {
				netSameCounter += 1;
				console.log("Last epoch was same twice");
				if (netSameCounter > 20) {
					clearInterval(netDataChecker);
					console.log("Canceled datachecker");
				}
			}
		}
	});
}

function updateNetGraph(data) {
	//TODO
	removeNetData(netChart);
    addNetData(netChart, data.epoch, data.cost);
}

net_dataset.addEventListener('change', function(){
    net_dataName = document.getElementById("net-datasetName");
    var arr = [];
    for (var i = net_dataset.length >>> 0; i--;) { 
      arr[i] = net_dataset[i].value;
    }

    var index = arr.indexOf(net_dataset.value)
    net_dataName.value = net_dataset[index].value
});

activation.addEventListener('change', function(){
    activationName = document.getElementById("net-activationName");
    var arr = [];
    for (var i = activation.length >>> 0; i--;) { 
      arr[i] = activation[i].value;
    }

    var index = arr.indexOf(activation.value)
    activationName.value = activation[index].value
});

//handles num of layers
numLayers.addEventListener('change', function(){
    nodesArray.length = 0
    num = numLayers.value;
    nodes.innerHTML = '';

    //makes sure layers is greater than 3
    if(num < 3){
      num = 3;
      numLayers.value = 3;
      alert("# Layers has to be > 3");
    }

    //updates layers in other inputs to match
    for(var i = 1; i < num - 1; i++){
      var node = document.createElement("option"); 
      var textnode = document.createTextNode("Nodes in Hidden Layer " + i);  
      node.appendChild(textnode);                              
      document.getElementById("nodes").appendChild(node);
      nodesArray.push(1) 
    } 
});

//handles dropdown menu
nodes.addEventListener('input', function(){
    //creats array of dropdown menu values
    var arr = [];
    for (var i = nodes.length >>> 0; i--;) { 
      arr[i] = nodes[i].value;
    }

    //updates shown value to match stored value
    var index = arr.indexOf(nodes.value)
    nodesLayer.value = nodesArray[index]
});

//handles num of nodes in each hidden layer
nodesLayer.addEventListener('input', function(){
    //creats array of dropdown menu values
    var arr = [];
    for (var i = nodes.length >>> 0; i--;) { 
      arr[i] = nodes[i].value;
    }

    //keeps track of nodes in each hiden layer
    var index = arr.indexOf(nodes.value)
    nodesArray[index] = Number(nodesLayer.value)
});
