// Javascript file for SPLOM visualization
// Authors: Eva Grench and Chris Tordi
// Date: 10/7/18



w = 300;			// Width of our visualization
h = 200;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 60;		// Space for y-axis labels
margin = 10;		// Margin around visualization
transDur = 1500;	// Duration of transitions (in milliseconds)
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure', 'tufte_metric', 'color']

//builds svg line plots
function makePlot(xVal, yVal, data, id) {
	console.log(id)
	xScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
				.range([yOffset + margin, w - margin]);
	yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
				.range([h - xOffset - margin, margin]);

	svg = d3.select("#" + id).append('svg:svg')
				.attr('width', w)
				.attr('height', h)

 	border = svg.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", h)
			.attr("width", w)
			.style("stroke", 'black')
			.style("fill", 'none')
			.style("stroke-width", 1);

	// Build axes and labels
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

	div = d3.select('body').append('div')
				.attr('class', 'tooltip')
				.style('opacity', 0);


	point = svg.selectAll('.point') // Select elements
				.data(data);		// Bind data to elements

	point.enter().append('svg:circle');

	// Update our selection
	point
		.attr('class', 'point')
		.attr('cx', function(d) { return xScale(d[xVal]);})	 	// x-coordinate
		.attr('cy', function(d) { return yScale(d[yVal]); })	// y-coordinate
		.style('fill','black')
		.style('stroke', 'none')
		.on("mouseover", function(d) { //display tool tip and highlight points
			div.transition()
				.duration(200)
				.style('opacity', .9);
			div.html('<p> Flight Index <br>' + d["flight_index"] + '</p>')
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
			highlightPoints(d, d3.select(this).style('fill'), 'rgb(192,192,192)')
		})
		.on("mouseout", function(d) { //hide tool tip and unhighlight points
			div.transition()
				.duration(400)
				.style('opacity', 0);

			highlightPoints(d, d3.select(this).style('fill'), 'black')
		})
		.on("click", function(d) { toggleHighlightPoints(d, d3.select(this).style('fill')) })
		.attr('r', 0)
		.transition()
		.duration(transDur)
		.attr('r', 3)
}

//Add labels to diagonal label slots
function addLabel(label, id) {
	console.log(id)
	$("#" + id).append("<h4 style='text-align:center'>" + label + "</h4>")
}

// load csv and call function that generates svgs
d3.csv('challenger.csv', function(csvData) {
	data = csvData;
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

//toggle point color for all points with same flight index
function toggleHighlightPoints(clickedPointData, color) {
	console.log("current clicked color: " + color);
	points = d3.selectAll('circle')
	for (i = 0; i < points.length; i++) {
		for (j = 0; j < points[i].length; j++) {
			if (points[i][j].__data__["flight_index"] == clickedPointData["flight_index"]) {
				if (points[i][j].style.fill == 'black') {
					points[i][j].style.fill = 'red'
				} else  {
					points[i][j].style.fill = 'black'
				}
			}
		}
	}
}

// loop through all points and changes points that share same flight index
function highlightPoints(clickedPointData, color, newColor) {
	console.log("current color: " + color);
	console.log("new  color: " + newColor);

	points = d3.selectAll('circle')
	for (i = 0; i < points.length; i++) {
		for (j = 0; j < points[i].length; j++) {
			if (points[i][j].__data__["flight_index"] != clickedPointData["flight_index"] && points[i][j].style.fill != 'red') {
				if (color == 'black') {
					points[i][j].style.fill = 'rgb(192,192,192)'
				} else {
					points[i][j].style.fill = newColor
				}
			} else {
				points[i][j].style.fill = 'black'
			}
		}
	}
}
