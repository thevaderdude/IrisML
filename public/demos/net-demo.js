var netStart = document.querySelector("#net-start");
var netStop = document.querySelector("#net-stop");

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