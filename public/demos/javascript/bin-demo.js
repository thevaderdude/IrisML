var binStart = document.querySelector("#bin-start");
var binReset = document.querySelector("#bin-reset");
var bin_dataset = document.getElementById("bin-dataset");
var bin_activation = document.getElementById("bin-activation");

var ctx = document.getElementById('bin-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var binChart = new Chart(ctx, {
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
        },
    }
});

function addBinData(chart, labels, dataPoints) {
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

function removeBinData(chart) {
    var length = chart.data.labels.length;
    for(var i = 0; i < length; i++){
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
    }
    chart.update();
}
binReset.addEventListener('click', function(){
    document.getElementById("bin-epochs").value = document.getElementById("bin-epochs").placeholder;
    document.getElementById("bin-batchSize").value = document.getElementById("bin-batchSize").placeholder;
    document.getElementById("bin-alpha").value = document.getElementById("bin-alpha").placeholder;
    document.getElementById("bin-lambda").value = document.getElementById("bin-lambda").placeholder;
    document.getElementById("bin-datasetName").value = document.getElementById("bin-datasetName").placeholder;
    document.getElementById("bin-dataset").value = document.getElementById("bin-dataset").options[0].value;
    document.getElementById("bin-activationName").value = document.getElementById("bin-activationName").placeholder;
    document.getElementById("bin-activation").value = document.getElementById("bin-activation").options[0].value;
});

binStart.addEventListener('click',function(){
    array = [
        document.getElementById("bin-activationName"),
        document.getElementById("bin-alpha"),
        document.getElementById("bin-lambda"),
        document.getElementById("bin-epochs"),
        document.getElementById("bin-batchSize"),
        document.getElementById("bin-datasetName"),
    ]

    inputs = []
    // checks to see if inputs have been made
    for(var i = 0; i < array.length; i++){
        if(array[i].value === ''){
            inputs.push(array[i].placeholder);
        } else {
            inputs.push(array[i].value)
        }
    }

    inputs[1] = parseFloat(inputs[1]);
    inputs[2] = parseFloat(inputs[2]);
    inputs[3] = parseInt(inputs[3]);
    inputs[4] = parseInt(inputs[4]);
    console.log(inputs)
  
    $.ajax({
        url: '/demos/bin',
        type: "POST",
        data: {inputs},
        success: function(res){
            removeBinData(binChart);
            addBinData(binChart, res.item.epoch, res.item.cost);
        },
        error: function(err){
            console.log(err)
        }
    }); 
});


bin_dataset.addEventListener('change', function(){
    bin_dataName = document.getElementById("bin-datasetName");
    var arr = [];
    for (var i = bin_dataset.length >>> 0; i--;) { 
      arr[i] = bin_dataset[i].value;
    }

    var index = arr.indexOf(bin_dataset.value)
    bin_dataName.value = bin_dataset[index].value
});

bin_activation.addEventListener('change', function(){
    bin_activationName = document.getElementById("bin-activationName");
    var arr = [];
    for (var i = bin_activation.length >>> 0; i--;) { 
      arr[i] = bin_activation[i].value;
    }

    var index = arr.indexOf(bin_activation.value)
    bin_activationName.value = bin_activation[index].value
});