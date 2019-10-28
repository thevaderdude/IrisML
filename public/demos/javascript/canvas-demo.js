var clear = document.getElementById('clear');
var guess = document.getElementById('guess');
var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
var canvasSmall= document.getElementById('canvasSmall');
var ctxSmall = canvasBig.getContext('2d');

window.onload = function(){
  $(".hide").remove();
}

var canvas = new fabric.Canvas('canvasBig', {
  isDrawingMode: true,
});
canvas.freeDrawingBrush.width = 25;

clear.addEventListener('click', function(){
  canvas.clear();
});

guess.addEventListener('click', function(){
  ctxSmall.drawImage(canvasBig, 0, 0, 280, 280, 0, 0, 28, 28);
  var image = ctxSmall.getImageData(0,0, canvasSmall.width, canvasSmall.height).data;
  var data = [];
  for(var i = 0; i < image.length; i++){
    if((i + 1) % 4 == 0){
      data.push(image[i]);
    }
  }
});
