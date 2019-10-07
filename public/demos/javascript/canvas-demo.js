var clear = document.getElementById('clear');

var canvas = this.__canvas = new fabric.Canvas('canvas', {
  isDrawingMode: true
});

clear.addEventListener('click', function(){
  canvas.clear();
});

var imageSaver = document.getElementById('guess');
imageSaver.addEventListener('click', function(e){
  this.href = canvas.toDataURL({
      format: 'png',
      quality: 0.8
  });
  this.download = 'canvas.png'
}, false);

