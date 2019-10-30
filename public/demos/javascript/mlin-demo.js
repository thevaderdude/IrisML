var mlinStart = document.querySelector("#mlin-start");
var mlinReset = document.querySelector("#mlin-reset");
var mlin_dataset = document.getElementById("mlin-dataset");

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
        },
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

mlinReset.addEventListener('click', function(){
    document.getElementById("mlin-epochs").value = document.getElementById("mlin-epochs").placeholder;
    document.getElementById("mlin-batchSize").value = document.getElementById("mlin-batchSize").placeholder;
    document.getElementById("mlin-alpha").value = document.getElementById("mlin-alpha").placeholder;
    document.getElementById("mlin-lambda").value = document.getElementById("mlin-lambda").placeholder;
    document.getElementById("mlin-datasetName").value = document.getElementById("mlin-datasetName").placeholder;
    document.getElementById("mlin-dataset").value = document.getElementById("mlin-dataset").options[0].value;
});

mlinStart.addEventListener('click',function(){
    array = [
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
    console.log(inputs)
    $.ajax({
        url: '/demos/mlin',
        type: "POST",
        data: {inputs},
        success: function(res){
            removeData(mlinChart)
            addData(mlinChart, res.item.epoch, res.item.cost)
        }
    }); 
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
}

mlin_dataset.addEventListener('change', function(){
    mlin_dataName = document.getElementById("mlin-datasetName");
    var arr = [];
    for (var i = mlin_dataset.length >>> 0; i--;) { 
      arr[i] = mlin_dataset[i].value;
    }

    var index = arr.indexOf(mlin_dataset.value)
    mlin_dataName.value = mlin_dataset[index].value
});
