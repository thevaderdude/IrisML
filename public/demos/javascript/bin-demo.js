var binStart = document.querySelector("#bin-start");
var binStop = document.querySelector("#bin-stop");
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
        }
    }
});

binStop.addEventListener('click',function(){
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

    $.ajax({
        url: '/demos/bin',
        type: "POST",
        data: {inputs},
        success: function(response){
            alert('evaluate response and show alert');
        }
    }); 
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

binStart.addEventListener('click', function(){
    for(i = 0; i < arrData.length; i++){

        addData(binChart,arrLabels[i],arrData[i]);
        binChart.update();

    }
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