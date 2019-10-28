var netStart = document.querySelector("#net-start");
var netStop = document.querySelector("#net-stop");
var guess = document.getElementById("guess");
var numLayers = document.getElementById('layers');
var nodes = document.getElementById("nodes");
var nodesLayer = document.getElementById("nodesLayer");
var activation = document.getElementById("net-activation");
var net_dataset = document.getElementById("net-dataset");
var nodesArray = [];

var netctx = document.getElementById('net-chart').getContext('2d');
var barctx = document.getElementById('bar-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

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

var barChart = new Chart(barctx, {
    type: 'bar',
    data: {
        labels: ['0','1','2','3','4','5','6','7','8','9'],
        datasets: [{
            data: [4,23,11,5,1,3,3,87,8,1],
            backgroundColor: 'rgba(255,223,0,0.7)',
            borderColor: 'rgb(255,255,255)',
        }],
        
    },
    options: {
        title:{
            display: true,
            text: 'Guess',
            fontSize: 24
        },
        legend:{
            display: false
        },
        scales:{
            yAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Probability',
                    fontSize: 18
                },
                interval: 20
            }],
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Number Guessed',
                    fontSize: 18
                },
            }],
        }
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
}

arrLabels = [6,7,8,9,10,11,12,13,14,15]
arrData = [100,150,200,300,320,380,400,600,900,1000]
var delayInMilliseconds = 1000;

netStart.addEventListener('click', function(){
    for(i = 0; i < arrData.length; i++){
        addData(netChart,arrLabels[i],arrData[i]);
        netChart.update();
    }
});

netStop.addEventListener('click', function(){
    if(nodesArray.length == 0){
        nodesArray = [16, 16]
    }
    array = [
        document.getElementById("net-epochs"),
        document.getElementById("net-batch"),
        document.getElementById("net-datasetName"),
        document.getElementById("net-activationName"),
        document.getElementById("net-alpha"),
        document.getElementById("net-lambda"),
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
        success: function(response){
         alert('evaluate response and show alert');
        }
    }); 
});


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
numLayers.addEventListener('input', function(){
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
