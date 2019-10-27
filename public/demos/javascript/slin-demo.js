var slinStart = document.querySelector("#slin-start");
var slinStop = document.querySelector("#slin-stop");
var slin_dataset = document.getElementById("slin-dataset");
var slin_activation = document.getElementById("slin-activation");

var ctx = document.getElementById('slin-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var slinChart = new Chart(ctx, {

    type: 'scatter',

    data: {
        datasets: [{
            data: [{
                x: 1000,
                y: 200
            }, {
                x: 800,
                y: 190
            }, {
                x: 1343,
                y: 237
            }, {
                x: 1689,
                y: 342
            }, , {
                x: 2583,
                y: 537
            }, , {
                x: 1733,
                y: 375
            }, , {
                x: 2349,
                y: 598
            }, , {
                x: 1724,
                y: 460
            }, , {
                x: 1965,
                y: 487
            }, , {
                x: 1278,
                y: 289
            }, , {
                x: 738,
                y: 137
            }, ],
            pointBorderColor: 'rgb(255,223,0)',
            borderColor: 'rgb(255,223,0)',
            trendlineLinear: {
                style: "rgba(255,105,180, .8)",
                lineStyle: "dotted|solid",
                width: 2
            }
        }],
        
    },

    options: {
        title:{
            display: true,
            text: 'Square Feet vs Housing Price',
            fontSize: 24
        },
        legend:{
            display: false
        },
        scales:{
            yAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Price (thousand)',
                    fontSize: 18
                },
            }],
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Square Feet',
                    fontSize: 18,
                    type: 'linear',
                    position: 'bottom'
                },
            }],
        },
        tooltips: {
            mode: 'index',
            intersect: true
        },
    }
});

slinStop.addEventListener('click',function(){
    alert('single-var linear demo');
});

slinStart.addEventListener('click', function(){
    for(i = 0; i < arrData.length; i++){

        addData(slinChart,arrLabels[i],arrData[i]);
        slinChart.update();

    }
});

slin_dataset.addEventListener('change', function(){
    slin_dataName = document.getElementById("slin-datasetName");
    var arr = [];
    for (var i = slin_dataset.length >>> 0; i--;) { 
      arr[i] = slin_dataset[i].value;
    }

    var index = arr.indexOf(slin_dataset.value)
    slin_dataName.value = slin_dataset[index].value
});

slin_activation.addEventListener('change', function(){
    slin_activationName = document.getElementById("slin-activationName");
    var arr = [];
    for (var i = slin_activation.length >>> 0; i--;) { 
      arr[i] = slin_activation[i].value;
    }

    var index = arr.indexOf(slin_activation.value)
    slin_activationName.value = slin_activation[index].value
});