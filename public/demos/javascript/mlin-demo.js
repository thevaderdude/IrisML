var mlinStart = document.querySelector("#mlin-start");
var mlinReset = document.querySelector("#mlin-reset");
var mlin_dataset = document.getElementById("mlin-dataset");

var mlinLastEpoch;

var mlinInstanceID;
var mlinDataChecker;
var mlinSameCounter = 0;

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
        },
    }
});

function addMlinData(chart, labels, dataPoints) {
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

function removeMlinData(chart) {
    var length = chart.data.labels.length;
    for(var i = 0; i < length; i++){
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
    }
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

    inputs[0] = parseFloat(inputs[0]);
    inputs[1] = parseFloat(inputs[1]);
    inputs[2] = parseInt(inputs[2]);
    inputs[3] = parseInt(inputs[3]);
    console.log(inputs)
    
    $.ajax({
        url: '/demos/mlin',
        type: "POST",
        data: {inputs},
        success: function(res){
            mlinInstanceID = Number(res);
			console.log("mlinInstanceID is " + mlinInstanceID);
			mlinDataChecker = setInterval(checkNewMlinData, 1000);
        },
        error: function(err){
            console.log(err)
        }
    }); 
});

function checkNewMlinData() {
	$.ajax({
		url: '/demos/newdata',
		type: "GET",
		data: {instanceID: mlinInstanceID},
		success: function(res) {
			console.log(res);
			if(mlinLastEpoch != res.epoch[res.epoch.length-1]) {
				mlinLastEpoch = res.epoch[res.epoch.length-1];
				updateMlinGraph(res);
				console.log("Got new data and updated graph");
			} else {
				mlinSameCounter += 1;
				console.log("Same data");
				if(mlinSameCounter > 20) {
					clearInterval(mlinDataChecker);
					console.log("Canceled mlinDataChecker");
				}
			}
		}
	});
}

function updateMlinGraph(data) {
	removeMlinData(mlinChart);
	addMlinData(mlinChart, data.epoch, data.cost);
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
