// First, we will create some constants to define non-data-related parts of the visualization
w = 300;			// Width of our visualization
h = 200;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 60;		// Space for y-axis labels
margin = 10;		// Margin around visualization
transDur = 1500;	// Duration of transitions (in milliseconds)
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure', 'tufte_metric', 'color']

var div = d3.select('body').append('div')
	.attr('class', 'tooltip')
	.style('opacity', 0);

function makePlot(xVal, yVal, data, id) {
	console.log(id)
	xScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
				.range([yOffset + margin, w - margin]);
	yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
				.range([h - xOffset - margin, margin]); // Notice this is backwards!

	svg = d3.select("#" + id).append('svg:svg')
				.attr('width', w)
				.attr('height', h)

 	borderPath = svg.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", h)
			.attr("width", w)
			.style("stroke", 'black')
			.style("fill", 'none')
			.style("stroke-width", 1);

	// Build axes! (These are kind of annoying, actually...)
	xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(3);
	xAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + (h - xOffset) + ')')
			 .call(xAxis)
	xLabel = svg.append('text')
				.attr('class','label')
				.attr('x', w/2)
				.attr('y', h - 5)
				.on('click', function() {
					setXval(getNextVal(xVal));
				});
	yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.ticks(3);
	yAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + yOffset + ',0)')
				.call(yAxis)
	yLabel = svg.append('text')
				.attr('class','label')
				.attr('x', yOffset/2)
				.attr('y', h/2-10)
				.on('click', function() {
					setYval(getNextVal(yVal));
				});


	// Now, we will start actually building our scatterplot!
	point = svg.selectAll('.point') // Select elements
				.data(data);		// Bind data to elements

	point.enter().append('svg:circle');
			 	// Create new elements if needed

	tooltip = svg.selectAll('circle')
							 .append("div")
							 .style("position", "absolute")
							 .style("z-index", "10")
							 .style("visibility", "hidden");
	// Update our selection
	point
		.attr('class', 'point')									// Give it a class
		.attr('cx', function(d) {
            return xScale(d[xVal]);
        })	// x-coordinate
		.attr('cy', function(d) { return yScale(d[yVal]); })	// y-coordinate
		.style('fill','green')
		.style('stroke', 'none')
		.on("mouseover", function(d) { highlightPoints(d, d3.select(this).style('fill'), 'red') })
		.on("mouseout", function(d) { highlightPoints(d, d3.select(this).style('fill'), 'green') })
		.on("click", function(d) { toggleHighlightPoints(d, d3.select(this).style('fill')) })
		.attr('r', 0)
		.transition()
		.duration(transDur)
		.attr('r', 3)									// radius
}

function addLabel(label, id) {
	console.log(id)
	$("#" + id).append("<h4 style='text-align:center'>" + label + "</h4>")
}

d3.csv('challenger.csv', function(csvData) {
	data = csvData;
	// It will be helpful to define scales that convert
	// values from our data domain into screen coordinates.
	// d3 has built-in functionality for creating these scales.
	var id = 0;
	for (var i  = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			if (i == j) {
				addLabel(vals[i] , "a" + id.toString())
			} else {
				makePlot(vals[j], vals[i], data, "a" + id.toString())
			}
			id = id + 1
		}
	}
});

function toggleHighlightPoints(clickedPointData, color) {
	console.log("current clicked color: " + color);
	if (color == 'rgb(0, 255, 255)') {
		highlightPoints(clickedPointData, 'clicked', 'green')
	} else {
		highlightPoints(clickedPointData, color, 'rgb(0, 255, 255)')
	}
}

function highlightPoints(clickedPointData, color, newColor) {
	console.log("current color: " + color);
	console.log("new  color: " + newColor);

	points = d3.selectAll('circle')
	for (i = 0; i < points.length; i++) {
		for (j = 0; j < points[i].length; j++) {
			if (points[i][j].__data__["flight_index"] == clickedPointData["flight_index"]) {
				if (color == 'rgb(0, 255, 255)') {
					points[i][j].style.fill = 'rgb(0, 255, 255)'
				} else {
					points[i][j].style.fill = newColor
				}
			}
		}
	}
}

// A function to retrieve the next value in the vals list
function getNextVal(val) {
	return vals[(vals.indexOf(val) + 1) % vals.length];
};

// A function to change what values we plot on the x-axis
function setXval(val) {
	// Update xVal
	xVal = val;
	// Update the axis
	xScale.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
				   d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
	xAxis.scale(xScale);
	xAxisG.call(xAxis);
	xLabel.text(xVal);
	// Update the points
	d3.selectAll('.point')
		.transition()
		.duration(transDur)
		.attr('cx', function(d) { return xScale(d[xVal]); });
}

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
