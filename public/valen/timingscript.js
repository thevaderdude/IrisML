var start = new Date().getTime();
var numHits = 0;
var numClicks = 0;
var timeSum = 0;

appearAfterDelay();

function makeShapeAppear() {
    var top = Math.random() * 400;
    var left = Math.random() * 400;
    var w = Math.random() * 400 + 50;
    if (Math.random() > 0.5) {
        document.getElementById("shape").style.borderRadius = "50%"
    }
    document.getElementById("shape").style.backgroundColor = getRandomColor();
    document.getElementById("shape").style.top = top + "px";
    document.getElementById("shape").style.left = left +"px";
    document.getElementById("shape").style.width = w + "px";
    document.getElementById("shape").style.height = w + "px";
    document.getElementById("shape").style.display = "block";
    start = new Date().getTime();

}

document.onclick = function() {
    numClicks++;
    updateHits();
}

document.getElementById("shape").onclick = function() {
    document.getElementById("shape").style.display = "none";
    var end = new Date().getTime();
    var timeTaken = (end-start) / 1000;
    timeSum += timeTaken;
    document.getElementById("timeTaken").innerHTML = timeTaken + "s ";
    numHits++;
    updateHits();
    updateTime();
    appearAfterDelay();
}

function appearAfterDelay() {
    setTimeout(makeShapeAppear, Math.random() * 2000);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
}

function updateHits() {
    document.getElementById("hits").innerHTML = numHits + " / " + numClicks;
}

function updateTime() {
    document.getElementById("avgTime").innerHTML = (timeSum/numHits).toFixed(3) + "s";
}