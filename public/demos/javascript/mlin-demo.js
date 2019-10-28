var mlinStart = document.querySelector("#mlin-start");
var mlinStop = document.querySelector("#mlin-stop");
var mlin_dataset = document.getElementById("mlin-dataset");
var mlin_activation = document.getElementById("mlin-activation");

var ctx = document.getElementById('mlin-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var mlinChart = new Chart(ctx, {

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

mlinStop.addEventListener('click',function(){
    array = [
        document.getElementById("mlin-activationName"),
        document.getElementById("mlin-alpha"),
        document.getElementById("mlin-lambda"),
        document.getElementById("mlin-epochs"),
        document.getElementById("mlin-batchSize"),
        document.getElementById("mlin-datasetName"),
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
        url: '/demos/mlin',
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

mlinStart.addEventListener('click', function(){
    for(i = 0; i < arrData.length; i++){

        addData(mlinChart,arrLabels[i],arrData[i]);
        mlinChart.update();

    }
});

mlin_dataset.addEventListener('change', function(){
    mlin_dataName = document.getElementById("mlin-datasetName");
    var arr = [];
    for (var i = mlin_dataset.length >>> 0; i--;) { 
      arr[i] = mlin_dataset[i].value;
    }

    var index = arr.indexOf(mlin_dataset.value)
    mlin_dataName.value = mlin_dataset[index].value
});

mlin_activation.addEventListener('change', function(){
    mlin_activationName = document.getElementById("mlin-activationName");
    var arr = [];
    for (var i = mlin_activation.length >>> 0; i--;) { 
      arr[i] = mlin_activation[i].value;
    }

    var index = arr.indexOf(mlin_activation.value)
    mlin_activationName.value = mlin_activation[index].value
});