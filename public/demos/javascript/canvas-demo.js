var clear = document.getElementById('clear');
var guess = document.getElementById('guess');
var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
var canvasSmall= document.getElementById('canvasSmall');
var ctxSmall = canvasBig.getContext('2d');

var oldGuessGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var guessDataChecker;
var guessSameCounter = 0;

var canvas = new fabric.Canvas('canvasBig', {
  isDrawingMode: true,
});
canvas.freeDrawingBrush.width = 15;

var barctx = document.getElementById('bar-chart').getContext('2d');
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

clear.addEventListener('click', function(){
  canvas.clear();
});

guess.addEventListener('click', function(){
  ctxSmall.drawImage(canvasBig, 0, 0, canvasBig.width, canvasBig.height, 0, 0, 28, 28);
  var image = ctxSmall.getImageData(0,0, canvasSmall.width, canvasSmall.height).data;
  var imgarr = [1];
  for(var i = 0; i < image.length; i++){
    if((i + 1) % 4 == 0){
      imgarr.push(image[i] / 255);
    }
  }

  $.ajax({
    url: '/demos/guess',
    type: "POST",
    data: {instanceID: netInstanceID, data: imgarr},
    success: function(res){
        
		//TODO: Read graph instead of DB
		$.ajax({
			url: '/demos/newdata',
			type: "GET",
			data: {instanceID: netInstanceID},
			success: function(res) {
				oldGuessGraph = res.testingOutputs;
			},
		});
		
		guessDataChecker = setInterval(checkNewGuessData, 1000);
    },
    error: function(err){
      console.log(err);
    }
  }); 
});

function checkNewGuessData() {
	$.ajax({
		url: '/demos/newdata',
		type: "GET",
		data: {instanceID: netInstanceID},
		success: function(res) {
			if (res.testingOutputs != oldGuessGraph) {
				updateGuessGraph(res)
				console.log("Updated guess graph");
				clearInterval(guessDataChecker);
			}
		},
	});
}

function updateGuessGraph(data) {
	removeGuessData(barChart);
	addGuessData(barChart, ['0','1','2','3','4','5','6','7','8','9'], data.testingOutputs);
}

function addGuessData(chart, labels, dataPoints) {
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

function removeGuessData(chart) {
  for(var i = 0; i < 10; i++){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
  }
  chart.update();
}
