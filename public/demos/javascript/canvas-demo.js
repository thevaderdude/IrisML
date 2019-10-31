var clear = document.getElementById('clear');
var guess = document.getElementById('guess');
var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
var canvasSmall= document.getElementById('canvasSmall');
var ctxSmall = canvasBig.getContext('2d');

var canvas = new fabric.Canvas('canvasBig', {
  isDrawingMode: true,
});
canvas.freeDrawingBrush.width = 20;

var barctx = document.getElementById('bar-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var barChart = new Chart(barctx, {
  type: 'bar',
  data: {
      labels: ['0','1','2','3','4','5','6','7','8','9'],
      datasets: [{
          data: [10,10,10,10,10,10,10,10,10,10],
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
              interval: 20
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

clear.addEventListener('click', function(){
  canvas.clear();
});

guess.addEventListener('click', function(){
  ctxSmall.drawImage(canvasBig, 0, 0, canvasBig.width, canvasBig.height, 0, 0, 28, 28);
  var image = ctxSmall.getImageData(0,0, canvasSmall.width, canvasSmall.height).data;
  var data = [];
  for(var i = 0; i < image.length; i++){
    if((i + 1) % 4 == 0){
      data.push(image[i] / 255);
    }
  }

  $.ajax({
    url: '/demos/guess',
    type: "POST",
    data: {data},
    success: function(res){
        removeGuessData(barChart)
        addGuessData(barChart, ['0','1','2','3','4','5','6','7','8','9'], res.item.guesses)
    },
    error: function(err){
      console.log(err)
    }
  }); 
});

function addGuessData(chart, labels, dataPoints) {
  labels.forEach((label) => {
      console.log(label)
      chart.data.labels.push(label);
  })
  chart.data.datasets.forEach((dataset) => {
      dataPoints.forEach((point) => {
          console.log(point)
          dataset.data.push(point);
      })
  });
  chart.update();
}

function removeGuessData(chart) {
  for(var i = 0; i < 10; i++){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
  }
  chart.update();
}
