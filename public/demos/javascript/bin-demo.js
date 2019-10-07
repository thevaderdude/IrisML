var binStart = document.querySelector("#bin-start");
var binStop = document.querySelector("#bin-stop");

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
    alert('binary classification demo');
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