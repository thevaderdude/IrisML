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

clear.addEventListener('click', function(){
  canvas.clear();
});

guess.addEventListener('click', function(){
  ctxSmall.drawImage(canvasBig, 0, 0, canvasBig.width, canvasBig.height, 0, 0, 28, 28);
  var image = ctxSmall.getImageData(0,0, canvasSmall.width, canvasSmall.height).data;
  var data = [];
  var location = [];
  for(var i = 0; i < image.length; i++){
    if((i + 1) % 4 == 0){
      data.push(image[i] / 255);
    }
  }
  for(var i = 0; i < data.length; i++){
      if(data[i] > 0){
        location.push(i)
      }
  }

  $.ajax({
    url: '/demos/guess',
    type: "POST",
    data: data,
    success: function(response){
        alert('evaluate response and show alert');
    }
}); 
});
