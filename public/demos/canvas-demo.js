var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var drawing = false;
var prev;

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', function(e) {
	drawing = true;
});

canvas.addEventListener('mousemove', function(e) {
	
	if (drawing) {
  	var coord = { 'x': e.offsetX, 'y': e.offsetY };
    if (prev !== undefined) {
    	context.beginPath();
      context.moveTo(prev.x, prev.y);
      context.lineTo(coord.x, coord.y);
      context.stroke();
    }
    prev = coord;
  }
});

canvas.addEventListener('mouseup', function() {
	drawing = false;
  prev = undefined;
});

