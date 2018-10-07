
w = 1200;			// Width of our visualization
h = 700;			// Height of our visualization
margin = 10;
xOffset = 40;
transDur = 1500;	// Duration of transitions (in milliseconds)
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure', 'tufte_metric']

var svg = d3.select('#parallelcoordinates')
  .append('svg:svg')
  .attr('width', w)
  .attr('height', h);

var lineFunction = d3.svg.line()
  .x(function(d) {
    console.log("d " + d)
    console.log("d[0] " + d[0])
    return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate("linear");

function makeBar(yVal, data, yOffset) {
  yScale = d3.scale.linear()
  			.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
  					 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
  			.range([h - margin, margin]); // Notice this is backwards!

  yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.ticks(3);

  yAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + yOffset + ',0)')
				.call(yAxis);

  // Now, we will start actually building our scatterplot!
	point = svg.selectAll('.' + yVal) // Select elements
				.data(data);		// Bind data to elements

	point.enter().append('svg:circle');
			 	// Create new elements if needed


    // Update our selection
  	point
  		.attr('class', yVal)  // Give it a class
  		.attr('cx', yOffset)	// x-coordinate
  		.attr('cy', function(d) { return yScale(d[yVal]); })	// y-coordinate
  		.style('fill','green')
  		.style('stroke', 'none')
  		.attr('r', 0)
  		.transition()
  		.duration(transDur)
  		.attr('r', 3)
}

function drawLines(startYVal, endYVal, startYOffset, endYOffset) {
  startPoints = svg.selectAll('.' + startYVal);
  endPoints = svg.selectAll('.' + endYVal);
  console.log("startPoints[i][j].x " + startPoints[0][0].cx);
  flight_index = 1
	for (i = 0; i < startPoints.length; i++) {
    for (j = 0; j < startPoints[i].length; j++) {
      var line = svg.append("line")
        .attr("x1", startPoints[i][j].cx)
        .attr("y1", startPoints[i][j].cy)
        .attr("x2", endPoints[i][j].cx)
        .attr("y2", endPoints[i][j].cy)
        .style('stroke', 'black');
    }
  }
}

function makeLineData(data, flight_index, yOffset) {
  lineData = []
  points = svg.selectAll('circle')[0];
  for (i = 0; i < points.length; i ++) {
    lineData.append({'x': points[i].cx, 'y': points[i].__data__[]})
  }
}

d3.csv('challenger.csv', function(csvData) {
  data = csvData;
  for (i = 0; i < vals.length; i++) {
    makeBar(vals[i], data , (i+1)*200);
  }
  for (i = 0; i < vals.length; i++) {
    if (i + 1 < vals.length) {
      drawLines(vals[i], vals[i + 1], data, (i+1)*200, (i+2)*200);
    }
  }
});


// A function to change what values we plot on the y-axis
function setYval(val) {
	// Update yVal
	yVal = val;
	// Update the axis
	yScale.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
	yAxis.scale(yScale);
	yAxisG.call(yAxis);
	yLabel.text(yVal);
	// Update the points
	d3.selectAll('.point')
		.transition()
		.duration(transDur)
		.attr('cy', function(d) { return yScale(d[yVal]); });
};
