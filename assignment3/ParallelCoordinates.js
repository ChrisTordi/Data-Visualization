// Javascript file for Parallel Coordinates visualization
// Authors: Eva Grench and Chris Tordi
// Date: 10/7/18



w = 1200;			// Width of our visualization
h = 700;			// Height of our visualization
margin = 10;        // Margin around visualization
xOffset = 40;       // Space for x-axis labels
transDur = 1500;	// Duration of transitions (in milliseconds)
vals = ['flight_index','num_o_ring_distress','launch_temp','leak_check_pressure', 'tufte_metric'] // data columns

// create svg element at parallelcoordinates id
var svg = d3.select('#parallelcoordinates')
  .append('svg:svg')
  .attr('width', w)
  .attr('height', h + 12);

// create vertical bars along x-axis at barPosition
function makeBar(yVal, data, barPosition) {
    // scales y-axis for vertical bars
    yScale = d3.scale.linear()
    			.domain([d3.min(data, function(d) { return parseFloat(d[yVal]); })-1,
    					 d3.max(data, function(d) { return parseFloat(d[yVal]); })+1])
    			.range([h - margin, margin]);

    yAxis = d3.svg.axis()
    			.scale(yScale)
    			.orient('left')
    			.ticks(3)

    yAxisG = svg.append('g')
    			.attr('class', 'axis')
    			.attr('transform', 'translate(' + barPosition + ',0)')
        .style({'stroke-width': '2px'})
    			.call(yAxis);

    yLabel = svg.append('text')
    			.attr('class','label')
    			.attr('x', barPosition)
    			.attr('y', h + 10)
    			.text(yVal);
}

// creates lines in between vertical bars
function drawLines(yValStart, yValEnd, barPositionStart, barPositionEnd, data) {
    yScaleStart = d3.scale.linear()
    			    .domain([d3.min(data, function(d) { return parseFloat(d[yValStart]); })-1,
    					 d3.max(data, function(d) { return parseFloat(d[yValStart]); })+1])
    			    .range([h - margin, margin]);

    yScaleEnd = d3.scale.linear()
    		      .domain([d3.min(data, function(d) { return parseFloat(d[yValEnd]); })-1,
    				 d3.max(data, function(d) { return parseFloat(d[yValEnd]); })+1])
    		      .range([h - margin, margin]);

    tooltip = d3.select('body').append('div')
    		    .attr('class', 'tooltip')
    		    .style('opacity', 0);

    line = svg.selectAll('.line' + yValStart)
              .data(data)

    //attaches line data to each line
    line.enter().append('line')
        .attr('class', 'line' + yValStart)
        .attr("x1", barPositionStart)
        .attr("y1", function(d) { return yScaleStart(d[yValStart]); })
        .attr("x2", barPositionEnd)
        .attr("y2", function(d) { return yScaleEnd(d[yValEnd]); })
        .style('stroke', 'SteelBlue')
        .style('stroke-width', '2px')
        .on("mouseover", function(d) {
    	       tooltip.transition()
    				  .duration(200)
    				  .style('opacity', .9);
               tooltip.html('<p> Flight Index <br>' + d["flight_index"] + '</p>')
    				  .style("left", (d3.event.pageX) + "px")
    				  .style("top", (d3.event.pageY - 28) + "px");
               highlightLine(d, 'Crimson');
        })
        .on("mouseout", function(d) {
              tooltip.transition()
    				 .duration(400)
    				 .style('opacity', 0);
              highlightLine(d, 'SteelBlue')
    		})
        .on("click", function(d) {
            if (d3.select(this).style('stroke-width') == '2px') {
                toggleLine(d, 'Crimson', '5px')
            } else {
                toggleLine(d, 'SteelBlue', '2px')
            }
        });
}

// changes visual data of line when clicked
function toggleLine(selectedLineData, newColor, newThiccness) {
  lines = d3.selectAll('line')
  for (i = 0; i < lines.length; i++) {
    for (j = 0; j < lines[i].length; j++) {
      if (lines[i][j].__data__["flight_index"] == selectedLineData["flight_index"]) {
        lines[i][j].style.stroke = newColor
        lines[i][j].style.strokeWidth = newThiccness
      }
    }
  }
}

// changes visual data of line when hovered over and moused out
function highlightLine(selectedLineData, newColor) {
  lines = d3.selectAll('line')
	for (i = 0; i < lines.length; i++) {
		for (j = 0; j < lines[i].length; j++) {
			if (lines[i][j].__data__["flight_index"] == selectedLineData["flight_index"] && lines[i][j].style.strokeWidth != '5px') {
				lines[i][j].style.stroke = newColor
			}
		}
	}
}

// loads csv data and calls create bars and create line functions
d3.csv('challenger.csv', function(csvData) {
  data = csvData;
  for (i = 0; i < vals.length; i++) {
    if (i + 1 < vals.length) {
      drawLines(vals[i], vals[i + 1] , (i+1)*200, (i+2)*200, data);
    }
    makeBar(vals[i], data , (i+1)*200);
  }
});
