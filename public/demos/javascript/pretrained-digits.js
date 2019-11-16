var clear = document.getElementById('preClear');
var guess = document.getElementById('preGuess');
var canvasBig = document.getElementById('preCanvasBig');
var ctxBig = canvasBig.getContext('2d');
var ctxSmall = canvasBig.getContext('2d');

var oldGuessGraph = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var guessDataChecker;
var preGuessSameCounter = 0;
var guessInstanceID;

var canvas = new fabric.Canvas('preCanvasBig', {
    isDrawingMode: true,
});
canvas.freeDrawingBrush.width = 30; //this width works! :)

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

  clear.addEventListener('click', function(){
    canvas.clear();
  });
  
  guess.addEventListener('click', function(){
    var imgarr = [1];
  
    //get canvasBig into a usable array
    var bigArr = [];
    console.log(canvasBig);
    var bigImg = ctxBig.getImageData(0, 0, canvasBig.width, canvasBig.height).data;
    console.log(bigImg);
    for(i = 3; i < bigImg.length; i+=4){
      bigArr.push(bigImg[i]);
    }
    console.log(bigArr);
    //downscale to 28x28 array
    var size = 420;
    var step = size / 28;
    for(var i = 0; i < size; i += step){
      for(var j = 0; j < size; j += step){
        var arrTemp = []
        for(var k = 0; k < step; k++){
          for(var l = 0; l < step; l++){
            arrTemp.push(bigArr[(size * (i + k)) + (l + j)]); 
          }
        }
        var avg = 0;
        for(var k = 0; k < Math.pow(step, 2); k++){
          avg += arrTemp[k];
        }
        avg /= Math.pow(step, 2);
        imgarr.push(avg / 255);
      }
    }
    console.log(imgarr);
  
    $.ajax({
      url: '/demos/preguess',
      type: "POST",
      data: {data: imgarr},
      success: function(res){
          guessInstanceID = Number(res);
          //TODO: Read graph instead of DB
          $.ajax({
              url: '/demos/prenewdata',
              type: "GET",
              data: {instanceID: guessInstanceID},
              success: function(res) {
                console.log('preguess post request works! instanceID ' + guessInstanceID);
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
          url: '/demos/prenewdata',
          type: "GET",
          data: {instanceID: guessInstanceID},
          success: function(res) {  
              if (res.testingOutputs != oldGuessGraph) {
                  updateGuessGraph(res)
                  console.log("Updated guess graph");
                  clearInterval(guessDataChecker);
              }
              else {
                preGuessSameCounter += 1;
                console.log("Same data");
                if (netSameCounter > 60) {
                  clearInterval(guessDataChecker);
                  console.log("Canceled preGuessDataChecker");
                }
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
  


