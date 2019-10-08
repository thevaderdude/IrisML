var clear = document.getElementById('clear');

var canvas = this.__canvas = new fabric.Canvas('canvas', {
  isDrawingMode: true,
});

canvas.freeDrawingBrush.width = 50;

clear.addEventListener('click', function(){
  canvas.clear();
});

var imageSaver = document.getElementById('guess');

imageSaver.addEventListener('click', function(e){
  var canvas = document.getElementById("canvas");
  var image = canvas.toDataURL("image/png", {
    height: 28,
    width: 28,
  }); 
}, false);

