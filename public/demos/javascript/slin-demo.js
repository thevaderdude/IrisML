var slinStart = document.querySelector("#slin-start");
var slinReset = document.querySelector("#slin-reset");
var fileInput = document.getElementById('slin-file');
var margin = {
     top: 20,
     right: 20,
     bottom: 30,
     left: 30
}; 
var width = 650;
var height = 500;
graphData = []

var slinLastEpoch;

var slinInstanceID;
var slinDataChecker;
var slinSameCounter = 0;

defaultData = [{x: 4335.0, y: 4167.0}, {x: 4216.0, y: 3920.0}, {x: 679.0, y: 673.0}, {x: 4466.0, y: 4714.0}, 
    {x: 2465.0, y: 2512.0}, {x: 2826.0, y: 2569.0}, {x: 2605.0, y: 2329.0}, {x: 4260.0, y: 4249.0}, 
    {x: 1442.0, y: 1353.0}, {x: 2584.0, y: 2647.0}, {x: 4291.0, y: 4392.0}, {x: 3348.0, y: 3631.0}, 
    {x: 553.0, y: 691.0}, {x: 1367.0, y: 1608.0}, {x: 2210.0, y: 2363.0}, {x: 4096.0, y: 4369.0}, 
    {x: 3796.0, y: 3848.0}, {x: 3508.0, y: 3272.0}, {x: 630.0, y: 480.0}, {x: 2847.0, y: 3008.0}, 
    {x: 624.0, y: 573.0}, {x: 3514.0, y: 3230.0}, {x: 2931.0, y: 2933.0}, {x: 1155.0, y: 1200.0}, 
    {x: 1401.0, y: 1186.0}, {x: 2622.0, y: 2899.0}, {x: 1757.0, y: 1616.0}, {x: 3494.0, y: 3472.0}, 
    {x: 3722.0, y: 3971.0}, {x: 3981.0, y: 4244.0}, {x: 4465.0, y: 4441.0}, {x: 840.0, y: 683.0}, 
    {x: 2626.0, y: 2423.0}, {x: 1925.0, y: 1839.0}, {x: 2200.0, y: 2129.0}, {x: 666.0, y: 875.0}, 
    {x: 1516.0, y: 1462.0}, {x: 2451.0, y: 2408.0}, {x: 3605.0, y: 3356.0}, {x: 2994.0, y: 2877.0}, 
    {x: 3239.0, y: 2949.0}, {x: 1500.0, y: 1763.0}, {x: 3768.0, y: 3730.0}, {x: 3015.0, y: 2977.0}, 
    {x: 2279.0, y: 2036.0}, {x: 982.0, y: 712.0}, {x: 1475.0, y: 1387.0}, {x: 3640.0, y: 3519.0}, 
    {x: 3455.0, y: 3560.0}, {x: 3759.0, y: 3569.0}, {x: 1141.0, y: 1003.0}, {x: 1983.0, y: 1865.0}, 
    {x: 3733.0, y: 3635.0}, {x: 1876.0, y: 2014.0}, {x: 4036.0, y: 3775.0}, {x: 4359.0, y: 4623.0}, 
    {x: 3951.0, y: 3768.0}, {x: 1341.0, y: 1603.0}, {x: 2471.0, y: 2477.0}, {x: 769.0, y: 1039.0}, 
    {x: 2240.0, y: 2313.0}, {x: 3622.0, y: 3793.0}, {x: 586.0, y: 816.0}, {x: 4187.0, y: 4187.0}, 
    {x: 849.0, y: 879.0}, {x: 746.0, y: 696.0}, {x: 4215.0, y: 4246.0}, {x: 4106.0, y: 3931.0}, 
    {x: 822.0, y: 896.0}, {x: 1516.0, y: 1661.0}, {x: 1991.0, y: 1719.0}, {x: 1865.0, y: 1928.0}, 
    {x: 647.0, y: 910.0}, {x: 2845.0, y: 2914.0}, {x: 4456.0, y: 4417.0}, {x: 3209.0, y: 3281.0}, 
    {x: 3498.0, y: 3330.0}, {x: 571.0, y: 635.0}, {x: 1393.0, y: 1147.0}, {x: 1320.0, y: 1164.0}, 
    {x: 1087.0, y: 1340.0}, {x: 2349.0, y: 2078.0}, {x: 3923.0, y: 3897.0}, {x: 3248.0, y: 3325.0}, 
    {x: 4426.0, y: 4583.0}, {x: 1333.0, y: 1177.0}, {x: 1115.0, y: 1257.0}, {x: 2221.0, y: 2386.0}, 
    {x: 930.0, y: 751.0}, {x: 1363.0, y: 1474.0}, {x: 963.0, y: 1041.0}, {x: 1712.0, y: 1625.0}, 
    {x: 1317.0, y: 1109.0}, {x: 4199.0, y: 4344.0}, {x: 2498.0, y: 2535.0}, {x: 2491.0, y: 2328.0}, 
    {x: 2648.0, y: 2383.0}, {x: 1128.0, y: 1158.0}, {x: 3687.0, y: 3698.0}, {x: 3017.0, y: 3215.0} ]

var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.selectAll(".white").style("fill", "white");

var slinctx = document.getElementById('slin-chart').getContext('2d');
Chart.defaults.global.defaultFontColor = 'rgb(255,255,255)';

var slinChart = new Chart(slinctx, {
    type: 'line',
    data: {
        labels: ['1','2','3','4','5'],
        datasets: [{
            data: [1000,500,200,100,50],
            pointBorderColor: 'rgb(255,223,0)',
            borderColor: 'rgb(255,223,0)',
        }],
        
    },
    options: {
        title:{
            display: true,
            text: 'Epoch vs Cost',
            fontSize: 24
        },
        legend:{
            display: false
        },
        scales:{
            yAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Cost',
                    fontSize: 18
                },
                ticks: {
                    min: 0
                }
            }],
            xAxes:[{
                scaleLabel: {
                    display: true,
                    labelString: 'Epoch',
                    fontSize: 18
                },
            }],
        },
    }
});

function addSlinData(chart, labels, dataPoints) {
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
 
function removeSlinData(chart) {
     var length = chart.data.labels.length;
     for(var i = 0; i < length; i++){
         chart.data.labels.pop();
         chart.data.datasets.forEach((dataset) => {
             dataset.data.pop();
         });
     }
     chart.update();
}

slinStart.addEventListener('click',function(){
    data = [];
    if(graphData[0] === undefined){
        data = defaultData;
    } else {
        data = graphData;
    }
    
    array = [
        document.getElementById("slin-alpha"),
        document.getElementById("slin-lambda"),
        document.getElementById("slin-epochs"),
        document.getElementById("slin-batchSize"),
        data
    ]

    inputs = []
    // checks to see if inputs have been made
    for(var i = 0; i < array.length - 1; i++){
        if(array[i].value === ''){
            inputs.push(array[i].placeholder);
        } else {
            inputs.push(array[i].value)
        }
    }
    inputs.push(array[array.length - 1]);

    console.log(inputs);

    $.ajax({
        url: '/demos/slin',
        type: "POST",
        data: {inputs},
        success: function(res) {
			slinInstanceID = Number(res);
			console.log("slinInstanceID is " + slinInstanceID);
			slinDataChecker = setInterval(checkNewSlinData, 1000);
        },
        error: function(err){
            console.log(err)
        }
    }); 
});

function checkNewSlinData() {
	$.ajax({
		url: '/demos/newdata',
		type: "GET",
		data: {instanceID: slinInstanceID},
		success: function(res) {
			console.log(res);
			if (slinLastEpoch != res.epoch[res.epoch.length-1]) {
				slinLastEpoch = res.epoch[res.epoch.length-1]
				updateSlinGraph(res);
                console.log("Got new data and updated graph");
                slinSameCounter = 0
			} else {
				slinSameCounter += 1;
				console.log("Same data");
				if (slinSameCounter > 20) {
					clearInterval(slinDataChecker);
					console.log("Canceled slinDataChecker");
				}
			}
		}
	});		
}

function updateSlinGraph(data) {
    svg.selectAll("line").remove();
	b = data.slope
    a = data.intercept
    
    var maxX = max(defaultData);
    var minX = min(defaultData);
    var y1 = ((b * minX) + a) * (height / maxX)
    var y2 = ((b * maxX) + a)  * (height / maxX)

    svg.append("line")
        .style("stroke", "black")
        .attr("stroke-width", 3)
        .attr("x1", 0)
        .attr("y1", height - y1)
        .attr("x2", width)
        .attr("y2", height - y2);
    removeSlinData(slinChart);
    addSlinData(slinChart, data.epoch, data.cost);
}

fileInput.addEventListener('change', function(){
    Papa.parse(fileInput.files[0], {
         complete: function(results) {
              for(var i = 0; i < results.data.length - 1; i++){
                   graphData.push({x: parseInt(results.data[i][0]), y: parseInt(results.data[i][1])})
              } 
              svg.selectAll("text").remove();
              svg.selectAll("circle").remove();
              
              xAxis = prompt("What is the name of the x-axis?")
              yAxis = prompt("What is the name of the y-axis?")
              title = prompt("What is the title of the graph")

              genGraph(graphData, xAxis, yAxis, title);
         }
    });
});

slinReset.addEventListener('click', function(){
    svg.selectAll("line").remove();
    svg.selectAll("text").remove();
    svg.selectAll("circle").remove();
    genGraph(defaultData, "Square Footage", "Prices (Thousand)", "House Square Footage vs Price");
    document.getElementById("slin-alpha").value = document.getElementById("slin-alpha").placeholder;
    document.getElementById("slin-lambda").value = document.getElementById("slin-lambda").placeholder
    document.getElementById("slin-epochs").value = document.getElementById("slin-epochs").placeholder
    document.getElementById("slin-batchSize").value = document.getElementById("slin-batchSize").placeholder
    document.getElementById("slin-file").value = ''
})

function max(dataset){
    var max = 0;
    for(var i = 0; i < dataset.length; i++){
         if(dataset[i].x > max){
              max = dataset[i].x;
         }
    }
    return max
}

function min(dataset){
    var min = dataset[0].x;
    for(var i = 0; i < dataset.length; i++){
         if(dataset[i].x < min){
              min = dataset[i].x;
         }
    }
    return min
}

window.onload = genGraph(defaultData, "Square Footage", "Prices (Thousand)", "House Square Footage vs Price");

function genGraph(data, xAxis, yAxis, title){
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain(d3.extent(data, function (d) {
         return d.x;
    }));

    y.domain([0, d3.max(data, function (d) {
         return d.y;
    })]);
    
    var path = svg.selectAll("dot")
         .data(data)
         .enter().append("circle")
         .attr("r", 5)
         .attr("cx", function (d) {
              return x(d.x);
         })
         .attr("cy", function (d) {
              return y(d.y);
         })
         .attr("stroke", "rgba(255,223,0,0.8)")
         .attr("stroke-width", 1)
         .attr("fill", "rgba(255,223,0,0.8)");


    svg.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x));

    svg.append("g")
         .call(d3.axisLeft(y).tickFormat(function (d) {
              return + d3.format("")(d)
         }));

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text(xAxis);

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text(yAxis);

    svg.append("text")
    .attr("x", width/2)             
    .attr("y", 0)
    .attr("text-anchor", "middle")  
    .text(title);

    svg.selectAll('line').remove();
}
