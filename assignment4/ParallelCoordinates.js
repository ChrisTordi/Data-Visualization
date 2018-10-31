// Javascript file for Parallel Coordinates visualization
// Authors: Chris Tordi
// Date: 10/7/18




w = 1500;			// Width of our visualization
h = 700;			// Height of our visualization
margin = 10;        // Margin around visualization
xOffset = 40;       // Space for x-axis labels
transDur = 1500;	// Duration of transitions (in milliseconds)
 // data columns
 vals = ['Children', 'Social' , 'PersonnalCare','Volunteering' ,'Education', 'HouseholdMemberCare','NonHouseholdMemberCare']


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
        .style('stroke', function(d) {
            if (d["Spouse"] == 1.0) {
                return "#fb9a99"
            } else if (d["Spouse"] == 2.0) {
                return "#1f78b4"
            } else if (d["Spouse"] == 3.0){
                return "#b2df8a"
            }
        })
        .style('stroke-width', '2px')
        .on("mouseover", function(d) {
            toggleTooltip(d);
            highlightLine(d, 'Crimson');
        })
        .on("mouseout", function(d) {
            tooltip.transition()
    				 .duration(400)
    				 .style('opacity', 0);
            if (d["Spouse"] == 1.0) {
                 oldColor =  "#a6cee3"
             } else if (d["Spouse"] == 2.0) {
                 oldColor = "#1f78b4"
             } else if (d["Spouse"] == 3.0){
                 oldColor = "#b2df8a"
             }
              highlightLine(d, oldColor)
    		})
        /*.on("dblclick" , function(d) {
            if (d3.select(this).style('stroke-width') == '2px') {
                toggleLines(d, '7px')
            } else {
                toggleLines(d, '2px')
            }
        })*/
        .on("click", function(d) {
            if (d3.select(this).style('stroke-width') == '2px') {
                toggleLine(d, '7px')
            } else {
                toggleLine(d, '2px')
            }
        });
}

function toggleTooltip(d) {
    if (d["Spouse"] == 1.0) {
        spouse = "Spouse present"
    } else if (d["Spouse"] == 2.0) {
        spouse = "Unmarried partner present"
    } else if (d["Spouse"] == 3.0){
        spouse = "No spouse or unmarried partner present"
    }
    tooltip.transition()
           .duration(200)
           .style('opacity', .9);
    tooltip.html('<p>' + spouse  + '</p>' +
                '<p>' + d["Children"] + ' children')
           .style("left", (d3.event.pageX + 15) + "px")
           .style("top", (d3.event.pageY - 50) + "px");

}

// changes visual data of line when clicked
function toggleLine(selectedLineData, newThiccness) {
  lines = d3.selectAll('line')
  for (i = 0; i < lines.length; i++) {
    for (j = 0; j < lines[i].length; j++) {
      if ( lines[i][j].__data__["Spouse"] == selectedLineData["Spouse"] && lines[i][j].__data__["Children"] == selectedLineData["Children"]) {
          if (selectedLineData["Spouse"] == 1.0) {
               oldColor =  "#a6cee3"
           } else if (selectedLineData["Spouse"] == 2.0) {
               oldColor = "#1f78b4"
           } else if (selectedLineData["Spouse"] == 3.0){
               oldColor = "#b2df8a"
           }
        lines[i][j].style.stroke = oldColor
      }
      if (lines[i][j].__data__["Children"] == selectedLineData["Children"]) {
          lines[i][j].style.strokeWidth = newThiccness
      }
    }
  }
}

// changes visual data of line when clicked
function toggleLines(selectedLineData, newThiccness) {
  lines = d3.selectAll('line')
  for (i = 0; i < lines.length; i++) {
    for (j = 0; j < lines[i].length; j++) {
      if ( lines[i][j].__data__["Spouse"] == selectedLineData["Spouse"]) {
          if (selectedLineData["Spouse"] == 1.0) {
               oldColor =  "#a6cee3"
           } else if (selectedLineData["Spouse"] == 2.0) {
               oldColor = "#1f78b4"
           } else if (selectedLineData["Spouse"] == 3.0){
               oldColor = "#b2df8a"
           }
        lines[i][j].style.stroke = oldColor
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
			if (lines[i][j].__data__["Spouse"] == selectedLineData["Spouse"] && lines[i][j].style.strokeWidth != '7px' && lines[i][j].__data__["Children"] == selectedLineData["Children"]) {
				lines[i][j].style.stroke = newColor
			}
		}
	}
}



// loads csv data and calls create bars and create line functions
d3.csv('output_file.csv', function(csvData) {
  data = csvData;
  for (i = 0; i < vals.length; i++) {
    if (i + 1 < vals.length) {
      drawLines(vals[i], vals[i + 1] , (i+1)*200, (i+2)*200, data);
    }
    makeBar(vals[i], data , (i+1)*200);
  }
});
