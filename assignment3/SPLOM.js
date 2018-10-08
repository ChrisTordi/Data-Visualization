// Javascript file for SPLOM visualization
// Authors: Eva Grench and Chris Tordi
// Date: 10/8/18



w = 300;			// Width of our visualization
h = 200;			// Height of our visualization
xOffset = 40;		// Space for x-axis labels
yOffset = 60;		// Space for y-axis labels
margin = 10;		// Margin around visualization
transDur = 1500;	// Duration of transitions (in milliseconds)
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure', 'tufte_metric']  // Headings for the columns

// Make an entire scatter plot given the two variables being compared, the data, and a unique id
function makePlot(xVal, yVal, data, id) {
	// Scale the x and y values
	xScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[xVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[xVal]); })+1])
				.range([yOffset + margin, w - margin]);
	yScale = d3.scale.linear()
				.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
						 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
				.range([h - xOffset - margin, margin]);

	// Create the svg element (the individual scatter plot)
	svg = d3.select("#" + id).append('svg:svg')
				.attr('width', w)
				.attr('height', h)

	// Draw a black box around each scatter plot to differentiate them
 	border = svg.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("height", h)
			.attr("width", w)
			.style("stroke", 'black')
			.style("fill", 'none')
			.style("stroke-width", 1);

	// Build axes
	xAxis = d3.svg.axis()
				.scale(xScale)
				.orient('bottom')
				.ticks(3);
	xAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(0,' + (h - xOffset) + ')')
			 .call(xAxis)

	yAxis = d3.svg.axis()
				.scale(yScale)
				.orient('left')
				.ticks(3);
	yAxisG = svg.append('g')
				.attr('class', 'axis')
				.attr('transform', 'translate(' + yOffset + ',0)')
				.call(yAxis)

  // Create an invisible tooltip used for hovering over points
	tooltip = d3.select('body').append('div')
				.attr('class', 'tooltip')
				.style('opacity', 0);

  // Create the points
	point = svg.selectAll('.point') // Select elements
				.data(data);		// Bind data to elements

  // Add any extra that are needed
	point.enter().append('svg:circle');

	// Update the points with attributes and style
	point
		.attr('class', 'point')
		.attr('cx', function(d) { return xScale(d[xVal]);})	 	// x-coordinate
		.attr('cy', function(d) { return yScale(d[yVal]); })	// y-coordinate
		.style('fill','black')
		.style('stroke', 'none')
		.on("mouseover", function(d) { // On hover show tooltip and grey out other points
			tooltip.transition() // Make the tooltip visible
				.duration(200)
				.style('opacity', .9);

			tooltip.html('<p> Flight Index <br>' + d["flight_index"] + '</p>') // Position the tooltip next to the hoved point
				.style("left", (d3.event.pageX + 5) + "px")
				.style("top", (d3.event.pageY - 28) + "px");

			highlightPoints(d, d3.select(this).style('fill'), 'rgb(192,192,192)') // Grey out the rest of the points
		})
		.on("mouseout", function(d) { // On hover off remove tooltip and return color to normal
			tooltip.transition() // Make the tooltip invisible
				.duration(400)
				.style('opacity', 0);

			highlightPoints(d, d3.select(this).style('fill'), 'black') // Return other points to black
		})
		.on("click", function(d) { // On click turn point red
			toggleHighlightPoints(d, d3.select(this).style('fill'))
		})
		.attr('r', 0) // Make the points grow out of nowhere
		.transition()
		.duration(transDur)
		.attr('r', 3)
}

// Add labels to diagonal label slots
function addLabel(label, id) {
	$("#" + id).append("<h4 style='text-align:center'>" + label + "</h4>")
}

// Load the csv and call the function that generates svgs
d3.csv('challenger.csv', function(csvData) {
	data = csvData;
	var id = 0; // Generate a unique ID for each svg element
	for (var i  = 0; i < 5; i++) {
		for (var j = 0; j < 5; j++) {
			if (i == j) { // If they are the same just add the label
				addLabel(vals[i] , "a" + id.toString())
			} else { // Otherwise, generate a plot
				makePlot(vals[j], vals[i], data, "a" + id.toString())
			}
			id = id + 1
		}
	}
});

// Toggle point color for all points with the same flight index to red
function toggleHighlightPoints(clickedPointData, color) {
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

// Loop through all points and change colors for points that have different flight index to grey
function highlightPoints(clickedPointData, color, newColor) {
	points = d3.selectAll('circle')
	for (i = 0; i < points.length; i++) {
		for (j = 0; j < points[i].length; j++) {
			if (points[i][j].__data__["flight_index"] != clickedPointData["flight_index"] && points[i][j].style.fill != 'red') {
				if (color == 'black') {
					points[i][j].style.fill = 'rgb(192,192,192)'
				} else {
					points[i][j].style.fill = newColor
				}
			} else if (points[i][j].style.fill == 'red'){
				points[i][j].style.fill = 'red'
			} else {
				points[i][j].style.fill = 'black'
			}
		}
	}
}
