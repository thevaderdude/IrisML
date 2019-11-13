var clear = document.getElementById('preClear');
var guess = document.getElementById('preGuess');
var canvasBig = document.getElementById('preCanvasBig');
var ctxBig = canvasBig.getContext('2d');
var canvasSmall= document.getElementById('preCanvasSmall');
var ctxSmall = canvasBig.getContext('2d');

var oldGuessGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var guessDataChecker;
var guessSameCounter = 0;

var canvas = new fabric.Canvas('preCanvasBig', {
    isDrawingMode: true,
});
canvas.freeDrawingBrush.width = 15; //we need to change this

var barctx = document.getElementById('preBar-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var barChart = new Chart(barctx, {
    type: 'bar',
    data: {
        labels: ['0','1','2','3','4','5','6','7','8','9'],
        datasets: [{
            data: [.1,.1,.1,.1,.1,.1,.1,.1,.1,.1],
            backgroundColor: 'rgba(255,223,0,0.7)',
            borderColor: 'rgb(255,255,255)',
        }],
        
    },
    options: {
        title:{
            display: true,
            text: 'Guess',
            fontSize: 24
        },
        legend:{
            display: false
        },
        scales:{
            yAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Probability',
                    fontSize: 18
                },
                ticks: {
                  max: 1,
                  min: 0
                }
            }],
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Number Guessed',
                    fontSize: 18
                },
            }],
        }
    }
  });



