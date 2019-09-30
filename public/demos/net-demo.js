var netStart = document.querySelector("#net-start");
var netStop = document.querySelector("#net-stop");
var numLayers = document.getElementById('layers');
var nodes = document.getElementById("nodes");
var nodesLayer = document.getElementById("nodesLayer");
var nodesArray = [];
var initialized = false;

var ctx = document.getElementById('net-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var netChart = new Chart(ctx, {

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

    var epochs = document.getElementById("net-epochs").value;
    var alpha = document.getElementById("net-alpha").value;
    var lambda = document.getElementById("net-lambda").value;
    var inputs = document.getElementById("net-inputs").value;
    var outputs = document.getElementById("net-outputs").value;
    var instances = document.getElementById("net-instances").value;
    var layers = document.getElementById("layers").value;

    
});


netStop.addEventListener('click', function(){
    alert("Neural Net Demo");
});

//handles num of layers
numLayers.addEventListener('input', function(){
    nodesArray.length = 0
    num = numLayers.value;
    nodes.innerHTML = '';
    initialized = true;

    //makes sure layers is greater than 3
    if(num < 3){
      num = 3;
      numLayers.value = 3;
      alert("# Hidden Layers has to be > 3");
    }

    //updates layers in other inputs to match
    for(var i = 1; i < num - 1; i++){
      var node = document.createElement("option"); 
      var textnode = document.createTextNode("# Nodes in Hidden Layer " + i);  
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

    //Checks to see if nodesArray is initialized
    if(!initialized){
        initialized = true;
        for(var i = 0; i < numLayers.placeholder - 2; i++){
            nodesArray.push(1);            
        }
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

    //Checks to see if nodesArray is initialized
    if(!initialized){
        initialized = true;
        for(var i = 0; i < numLayers.placeholder - 2; i++){
            nodesArray.push(1);            
        }
    }

    //keeps track of nodes in each hiden layer
    var index = arr.indexOf(nodes.value)
    if(nodesArray[index] === undefined){
        alert('yo')
    }
    nodesArray[index] = Number(nodesLayer.value)
});

