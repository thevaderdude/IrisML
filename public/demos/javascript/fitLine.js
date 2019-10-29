data = [{x: 1000, y: 200}, {x: 800, y: 190}, {x: 1343, ny: 237}, {x: 1689, y: 342}, 
        {x: 2583, y: 537}, {x: 1733, y: 375}, {x: 2349, y: 598}, {x: 1724, y: 460}, 
        {x: 1965, y: 487}, {x: 1278, y: 289}, {x: 738, y: 137}]

var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40
}
width = 700 - margin.left - margin.right;
height = 500 - margin.top - margin.bottom;

// format the data
data.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.x = parseDate(d.x);
    d.y = +d.y;
});
//sort the data by date
data.sort(function (a, b) {
    return a.x - b.x;
});

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
// Scale the range of the data
x.domain(d3.extent(data, function (d) {
     return d.x;
}));
y.domain([0, d3.max(data, function (d) {
     return d.y;
})]);

var valueline = d3.line()
     .x(function (d) {
          return x(d.x);
     })
     .y(function (d) {
          return y(d.y);
     });

     var svg = d3.select("#scatter").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
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
     .attr("stroke-width", 1.5)
     .attr("fill", "rgba(255,223,0,0.8)");


     svg.append("g")
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x));
svg.append("g")
     .call(d3.axisLeft(y).tickFormat(function (d) {
          return + d3.format("")(d)
     }));
     