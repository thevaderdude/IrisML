var startButton = document.querySelector("#start");
var resetButton = document.querySelector("#stop");

window.onload = function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';
    var chart = new Chart(ctx, {
  
        type: 'line',
    
   
        data: {
            labels: ['1','2','3','4','5'],
            datasets: [{
                borderColor: 'rgb(255,255,255)',
                data: [1000,500,200,100,50,20],

            }],
            pointHoverBackgroundColor: 'rgb(0,0,0)',
            pointHoverBorderColor: 'rgb(0,0,0)'
        },
    

        options: {
            title:{
                display: true,
                text: 'Epoch vs Cost',
                fontSize: 24
            },
            legend:{
                position:'bottom',
                labels:{
                    fontColor: 'rgb(10, 38, 99)'
                }
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

}